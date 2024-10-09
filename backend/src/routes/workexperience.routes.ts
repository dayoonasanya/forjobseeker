// src/routes/workexperience.routes.ts

import { Router } from 'express';
import * as WorkExperienceController from '../controllers/workexperience.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route to add a new Work Experience
router.post(
  '/',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.addWorkExperience
);

// Route to get a Work Experience by ID
router.get(
  '/:workExperienceId',
  authenticateJWT,
  WorkExperienceController.getWorkExperienceById
);

// Route to update a Work Experience
router.put(
  '/:workExperienceId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.updateWorkExperience
);

// Route to soft delete a Work Experience
router.delete(
  '/:workExperienceId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.deleteWorkExperience
);

// Route to get all Work Experiences by Job Seeker
router.get(
  '/jobseeker/:jobSeekerId',
  authenticateJWT,
  WorkExperienceController.getWorkExperiencesByJobSeeker
);

export default router;
