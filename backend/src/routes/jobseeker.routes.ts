// src/routes/jobseeker.routes.ts

import { Router } from 'express';
import * as JobSeekerController from '../controllers/jobseeker.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route for creating a job seeker profile
router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.createJobSeekerProfile
);

// Route for getting a job seeker by ID
router.get('/:jobSeekerId', authenticateJWT, JobSeekerController.getJobSeekerById);

// Route for updating a job seeker profile
router.patch(
  '/:jobSeekerId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.updateJobSeekerProfile
);

// Route for soft deleting a job seeker profile
router.delete(
  '/:jobSeekerId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.JOBSEEKER]),
  JobSeekerController.deleteJobSeekerProfile
);

// Route for getting job seeker applications
router.get(
  '/:jobSeekerId/applications',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.getJobSeekerApplications
);

// Route to get all Job Seekers
router.get('/', authenticateJWT, JobSeekerController.getAllJobSeekers);

export default router;
