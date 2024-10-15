// src/routes/job.routes.ts

import { Router } from 'express';
import * as JobController from '../controllers/job.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route for creating a job
router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.createJob
);

// Route for getting a job by ID
router.get('/:jobId', JobController.getJobById);

// Route for updating a job
router.patch(
  '/:jobId',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.updateJob
);

// Route for soft deleting a job
router.delete(
  '/:jobId',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.deleteJob
);

// Route for getting all jobs with filtering options
router.get('/', JobController.getTotalJobsCount);

// Route for getting jobs by company
router.get('/company/:companyId', authenticateJWT, JobController.getJobsByCompany);

// Route for getting jobs by job field
router.get('/jobfield/:jobFieldId', authenticateJWT, JobController.getJobsByJobField);

export default router;
