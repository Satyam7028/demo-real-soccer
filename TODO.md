# TODO: Fix Server Startup Errors

## Completed Tasks
- [x] Create missing paymentRoutes.js file for Razorpay integration
- [x] Add import for paymentRoutes in server.js
- [x] Add route for /api/payments in server.js
- [x] Import crypto module in paymentRoutes.js

## Remaining Tasks
- [ ] Add required environment variables to .env file (user action needed):
  - NODE_ENV=development
  - PORT=5001
  - MONGO_URI=your_mongo_uri_here
  - JWT_SECRET=your_jwt_secret_here
  - RAZORPAY_KEY_ID=your_razorpay_key_id_here
  - RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
  - STRIPE_SECRET_KEY=your_stripe_secret_key_here
- [ ] Test server startup after adding environment variables
