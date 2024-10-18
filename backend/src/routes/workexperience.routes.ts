import { Router } from 'express';
import * as WorkExperienceController from '../controllers/workexperience.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.addWorkExperience
);

router.get(
  '/:workExperienceId',
  authenticateJWT,
  WorkExperienceController.getWorkExperienceById
);

router.put(
  '/:workExperienceId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.updateWorkExperience
);

router.delete(
  '/:workExperienceId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  WorkExperienceController.deleteWorkExperience
);

router.get(
  '/jobseeker/:jobSeekerId',
  authenticateJWT,
  WorkExperienceController.getWorkExperiencesByJobSeeker
);

export default router;
