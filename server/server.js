import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config({ path: '../.env' });
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
