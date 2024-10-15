// src/routes/application.routes.ts

import { Router } from 'express';
import * as ApplicationController from '../controllers/application.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Route for creating an application
router.post('/create', authenticateJWT, ApplicationController.createApplication);

// Route for getting an application by ID
router.get('/:applicationId', authenticateJWT, ApplicationController.getApplicationById);

// Route for updating application status
router.patch('/:applicationId/status', authenticateJWT, ApplicationController.updateApplicationStatus);

// Route for soft deleting an application
router.delete('/:applicationId', authenticateJWT, ApplicationController.deleteApplication);

// Route for getting applications by job
router.get('/job/:jobId', authenticateJWT, ApplicationController.getApplicationsByJob);

// Route for getting applications by job seeker
router.get('/jobseeker/:jobSeekerId', authenticateJWT, ApplicationController.getApplicationsByJobSeeker);

// Route for getting applications by company
router.get('/company/:companyId', authenticateJWT, ApplicationController.getApplicationsByCompany);


export default router;
