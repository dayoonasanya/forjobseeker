// src/routes/jobfield.routes.ts

import { Router } from 'express';
import * as JobFieldController from '../controllers/jobfield.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route for creating a job field
router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.createJobField
);

// Route for getting a job field by ID
router.get('/:jobFieldId', JobFieldController.getJobFieldById);

// Route for getting all job fields
router.get('/', JobFieldController.getAllJobFields);

// Route for updating a job field
router.patch(
  '/:jobFieldId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.updateJobField
);

// Route for soft deleting a job field
router.delete(
  '/:jobFieldId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  JobFieldController.deleteJobField
);

export default router;
