import { Router } from 'express';
import * as JobFieldController from '../controllers/jobfield.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();


router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.createJobField
);


router.get(
  '/:jobFieldId', 
  JobFieldController.getJobFieldById
);


router.get(
  '/', 
  JobFieldController.getAllJobFields
);


router.patch(
  '/:jobFieldId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.updateJobField
);


router.delete(
  '/:jobFieldId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.deleteJobField
);

export default router;
