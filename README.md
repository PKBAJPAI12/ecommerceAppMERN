
# E-commerce Application

This project is a fully functional e-commerce application built using the MERN stack, with integrations for payment processing and CI/CD pipelines. The application includes essential features such as user authentication, product management, shopping cart functionality, and secure payments.

Note: Some areas of the project are still missing features and need improvements, so I am continuously working on this.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Testing](#api-testing)
- [Deployment](#deployment)
- [Contact](#contact)
- [Upcoming Improvement](#upcoming-improvement)

## Features

- **User Authentication & Authorization**
  - Secure user registration with email verification using Node Mailer.
  - Encrypted password storage using bcrypt.
  - JWT-based authentication for secure login.
  - Role-based permissions for different user levels.

- **Product Management**
  - CRUD operations: Create, Read, Update, Delete products.
  - Advanced product filtration, search capabilities, and pagination.
  - Detailed product view with ratings.

- **Shopping Cart & Checkout**
  - Add products to the cart, manage quantities, and remove items.
  - Seamless checkout process.
  - Integrated Stripe API for secure payment processing.

- **Order Management**
  - Efficient order management with clear route definitions.
  - Role-specific access to order management functionalities.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux for state management
  - Material UI for responsive UI components

- **Backend:**
  - Node.js with Express.js
  - MongoDB for the database
  - Stripe API for payment processing
  - Node Mailer for email verification

- **Testing:**
  - Jest for API testing

- **Deployment:**
  - Netlify for frontend deployment
  - Render for backend deployment
  - GitHub Actions for CI/CD pipeline automation

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PKBAJPAI12/ecommerceAppMERN.git
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   npm install
   cd frontend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the backend directory with the following variables:
     ```plaintext
     PORT=your_choice-port
     CLOUDINARY_API_KEY=
     CLOUDINARY_API_SECRET
     CLOUDINARY_NAME
     COOKIE_EXPIRE=3
     DB_URL=your-mongo-uri
     JWT_EXPIRE=3d
     JWT_SECRET=your-jwt-secret
     SMTP_MAIL=your-email
     SMTP_PASSWORD=your-password
     SMTP_SERVICE=gmail or any other 
     STRIPE_API_KEY=your-stripe-key
     STRIPE_SECRET_KEY=your-stripe-secret-key
     ```

4. **Run the application:**
   ```bash
   Backend run
   npm run dev
   Frontend Run
   cd frontend
   npm start
   ```

## Usage

Once the application is running, you can access it via `http://localhost:${your_port}` in your web browser.

- Register a new user account.
- Browse and search for products.
- Add products to your shopping cart.
- Proceed to checkout and complete the purchase using Stripe.

## API Testing

This project uses **Jest** for API testing to ensure that all backend routes and logic are functioning correctly.

### Running Tests

1. **Install Jest:**
   If Jest is not already installed, you can add it to your project:
   ```bash
   npm install --save-dev jest supertest
   ```

2. **Write Tests:**
   - Create a `tests` directory in the `backend` folder.
   - Add your test files (e.g., `user.test.js`, `product.test.js`) inside this directory.
   - Example of a simple test file:
     ```javascript
     const request = require('supertest');
     const app = require('../app');

     describe('GET /api/products', () => {
       it('should return all products', async () => {
         const res = await request(app).get('/api/products');
         expect(res.statusCode).toEqual(200);
         expect(res.body).toHaveProperty('products');
       });
     });
     ```

3. **Run Tests:**
   Run your tests using the following command:
   ```bash
   npm test
   ```

Here's the updated `Deployment` section with placeholders for the Render and Netlify deployment links:

---

## Deployment

This project is deployed using Netlify for the frontend and Render for the backend. The CI/CD pipeline is set up with GitHub Actions to automate the deployment process.

- **Frontend:** The application is automatically deployed on Netlify upon commits to the `main` `qa` `dev` branch. You can view the live site here: [Netlify Deployment](https://ecommerceapplicationqa.netlify.app/).
  
- **Backend:** The server is automatically deployed on Render upon commits to the `main` `qa` `dev` branch. You can access the backend API here: [Render Deployment](https://mern-backend-8is5.onrender.com).

Replace the placeholder links with your actual deployment URLs. This will allow users to easily access the live application and API endpoints.

## Contact

For any inquiries or issues, feel free to contact me:

- **Email:** prateek.cse.uiet@gmail.com
- **LinkedIn:** [Your LinkedIn Profile](https://www.linkedin.com/in/prateek-bajpai-0662941bb/)

Here's the updated `README.md` with a section on upcoming improvements, including details on the current problems and ongoing work:

## Upcoming Improvements

- **Jest Test Cases:** Currently facing issues with test cases failing unexpectedly. Working on resolving these issues to ensure robust testing coverage.
- **Linting Errors:** Addressing existing linting errors to maintain code quality and consistency across the project.
- **Admin Role UI Features:** Enhancing the user interface for admin roles, including better management of product listings, orders, and user permissions.