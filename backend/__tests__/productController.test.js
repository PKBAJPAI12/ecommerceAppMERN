const request = require('supertest');
const app = require('../app'); // Adjust path if necessary
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModal');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cloudinary = require('cloudinary').v2;

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cloudinary.config({
    cloud_name: 'test',
    api_key: 'test',
    api_secret: 'test',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
});

describe('Product Controller', () => {
  let adminToken;
  let userToken;
  let productId;

  beforeAll(async () => {
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });
    adminToken = adminUser.getJWTToken();

    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
    });
    userToken = regularUser.getJWTToken();
  });

  describe('POST /api/v1/product/new', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Product 1',
        description: 'Product 1 Description',
        price: 100,
        category: 'Electronics',
        Stock: 10,
        images: [
          {
            public_id: 'test_image',
            url: 'http://dummyimage.com/150x150.png',
          },
        ],
      };

      const response = await request(app)
        .post('/api/v1/product/new')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct);

      productId = response.body.product._id;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('product');
      expect(response.body.product).toHaveProperty('name', newProduct.name);
    });

    it('should not create a product if not authorized', async () => {
      const newProduct = {
        name: 'Product 2',
        description: 'Product 2 Description',
        price: 200,
        category: 'Electronics',
        Stock: 20,
      };

      const response = await request(app)
        .post('/api/v1/product/new')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newProduct);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message', 'Role: user is not allowed to access this resource');
    });
  });

  describe('GET /api/v1/products', () => {
    it('should get all products', async () => {
      await Product.create({
        name: 'Product 1',
        description: 'Product 1 Description',
        price: 100,
        category: 'Electronics',
        Stock: 10,
      });

      const response = await request(app)
        .get('/api/v1/products');

      expect(response.status).toBe(200);
      expect(response.body.products).toHaveLength(1);
    });
  });

  describe('GET /api/v1/product/:id', () => {
    it('should get a single product by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/product/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.product).toHaveProperty('_id', productId);
    });
  });

  describe('PUT /api/v1/product/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = {
        price: 150,
      };

      const response = await request(app)
        .put(`/api/v1/product/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body.product).toHaveProperty('price', updatedProduct.price);
    });
  });

  describe('DELETE /api/v1/product/:id', () => {
    it('should delete a product', async () => {
      const response = await request(app)
        .delete(`/api/v1/product/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Product deleted successfully');
    });
  });
});
