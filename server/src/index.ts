import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pawmatchai';
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

// Middlewares
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'PawMatchAI Backend is running' });
});

// Middleware placeholder for JWT Authentication
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = (req as any).headers ? (req as any).headers['authorization'] : undefined;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user',
    };
    next();
  });
};

// Placeholder for Google OAuth setup info
app.get('/api/auth/google/callback-placeholder', (req: Request, res: Response) => {
  res.json({
    message: 'Google OAuth login flow placeholder. Set up Passport.js or Better Auth config here.',
    clientId: process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Missing GOOGLE_CLIENT_ID env'
  });
});

// Connect to MongoDB & Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB database.');
    app.listen(PORT, () => {
      console.log(`Server is running in development mode on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Error connecting to MongoDB:', error);
    // In local development without mongo running, we still boot Express server with warning
    console.warn('Booting server without database connection for local exploration...');
    app.listen(PORT, () => {
      console.log(`Server is running in fallback mode on port ${PORT}`);
    });
  });
