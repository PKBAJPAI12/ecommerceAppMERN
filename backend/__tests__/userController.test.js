const request = require('supertest');
const app = require('../app'); // Adjust path if necessary
const mongoose = require('mongoose');
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
  await User.deleteMany({});
});

describe('User Controller', () => {
  let userToken;

  describe('POST /api/v1/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        avatar: 'http://dummyimage.com/150x150.png',
      };

      const response = await request(app)
        .post('/api/v1/register')
        .send(newUser);

      userToken = response.body.token;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('name', newUser.name);
    });

    it('should not register a user with missing fields', async () => {
      const response = await request(app)
        .post('/api/v1/register')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Please Enter Email and Password');
    });
  });

  describe('POST /api/v1/loginUser', () => {
    it('should login a user', async () => {
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/v1/loginUser')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });

      userToken = response.body.token;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/loginUser')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid Email or Password');
    });
  });

  describe('POST /api/v1/password/forgot', () => {
    it('should send a password reset email', async () => {
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'john@example.com' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Email sent to john@example.com successfully');
    });

    it('should not send a password reset email if user not found', async () => {
      const response = await request(app)
        .post('/api/v1/password/forgot')
        .send({ email: 'nonexistent@example.com' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('PUT /api/v1/password/reset/:token', () => {
    it('should reset the user password', async () => {
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      const response = await request(app)
        .put(`/api/v1/password/reset/${resetToken}`)
        .send({ password: 'newpassword123', confirmPassword: 'newpassword123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('GET /api/v1/me', () => {
    it('should get user details', async () => {
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const token = user.getJWTToken();

      const response = await request(app)
        .get('/api/v1/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('email', user.email);
    });
  });

  describe('PUT /api/v1/me/update', () => {
    it('should update user profile', async () => {
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const token = user.getJWTToken();

      const response = await request(app)
        .put('/api/v1/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Updated',
          email: 'johnupdated@example.com',
          avatar: 'http://dummyimage.com/150x150.png',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('GET /api/v1/admin/allUsers', () => {
    it('should get all users (admin only)', async () => {
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });

      const token = adminUser.getJWTToken();

      const response = await request(app)
        .get('/api/v1/admin/allUsers')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.users).toHaveLength(2);
    });
  });

  describe('DELETE /api/v1/admin/user/:id', () => {
    it('should delete a user (admin only)', async () => {
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });

      const token = adminUser.getJWTToken();

      const response = await request(app)
        .delete(`/api/v1/admin/user/${user._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User Deleted Successfully');
    });
  });
});
