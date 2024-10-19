import { Router } from 'express';
import * as JobController from '../controllers/job.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();


router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.createJob
);


router.get('/:jobId', JobController.getJobById);


router.patch(
  '/:jobId',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.updateJob
);


router.delete(
  '/:jobId',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  JobController.deleteJob
);


router.get(
  '/', 
  JobController.getTotalJobsCount
);


router.get(
  '/company/:companyId', 
  authenticateJWT, 
  JobController.getJobsByCompany
);


router.get(
  '/jobfield/:jobFieldId', 
  authenticateJWT, 
  JobController.getJobsByJobField
);

export default router;
