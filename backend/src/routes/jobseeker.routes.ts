import { Router } from 'express';
import * as JobSeekerController from '../controllers/jobseeker.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();


router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.createJobSeekerProfile
);


router.get(
  '/:jobSeekerId', 
  authenticateJWT, 
  JobSeekerController.getJobSeekerById
);


router.patch(
  '/:jobSeekerId',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.updateJobSeekerProfile
);


router.delete(
  '/:jobSeekerId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.JOBSEEKER]),
  JobSeekerController.deleteJobSeekerProfile
);


router.get(
  '/:jobSeekerId/applications',
  authenticateJWT,
  authorizeRole([UserRole.JOBSEEKER]),
  JobSeekerController.getJobSeekerApplications
);


router.get(
  '/', 
  authenticateJWT, 
  JobSeekerController.getAllJobSeekers
);

export default router;
