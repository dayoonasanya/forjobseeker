import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from 'http';
import logger from './config/logger.config';
import { env } from './config/env.config';
import authRoutes from './routes/auth.routes';
import applicationRoutes from './routes/application.routes';
import certificationRoutes from './routes/certification.routes';
import companyRoutes from './routes/company.routes';
import jobRoutes from './routes/job.routes';
import jobFieldRoutes from './routes/jobfield.routes';
import jobSeekerRoutes from './routes/jobseeker.routes';
import searchRoutes from './routes/search.routes';
import workExperienceRoutes from './routes/workexperience.routes';

const app = express();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// CORS Configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/jobfields', jobFieldRoutes);
app.use('/api/jobseekers', jobSeekerRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/workexperience', workExperienceRoutes);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Server is up and running' });
});

// Handle 404 Errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the Server
const server: Server = app.listen(env.port, () => {
  logger.info(`Server started on port ${env.port}`);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  logger.info('Received shutdown signal. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed. Exiting process...');
    process.exit(0);
  });

  // Forceful shutdown if the server does not close within 10 seconds
  setTimeout(() => {
    logger.error('Forcefully shutting down...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
