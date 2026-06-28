import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authenticate } from './middleware/authenticate';
import taskRoutes from './routes/task.route';
import dashboardRoutes from './routes/dashboard.route';
import analyticsRoutes from './routes/analytics.route';
import settingsRoutes from './routes/settings.route';
import authRoutes from './routes/auth.route';

const app: Application = express();

// Trust proxy for secure cookies behind Render's load balancer
app.set('trust proxy', 1);

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Length'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes);
app.use('/api/analytics', authenticate, analyticsRoutes);
app.use('/api/settings', authenticate, settingsRoutes);

// Fallback error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
