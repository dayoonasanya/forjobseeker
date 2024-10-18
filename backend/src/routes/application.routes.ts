import { Router } from 'express';
import * as ApplicationController from '../controllers/application.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();


router.post(
    '/create', 
    authenticateJWT, 
    ApplicationController.createApplication
);


router.get(
    '/:applicationId', 
    authenticateJWT, 
    ApplicationController.getApplicationById
);


router.patch(
    '/:applicationId/status', 
    authenticateJWT, 
    ApplicationController.updateApplicationStatus
);


router.delete(
    '/:applicationId', 
    authenticateJWT, 
    ApplicationController.deleteApplication
);


router.get(
    '/job/:jobId', 
    authenticateJWT, 
    ApplicationController.getApplicationsByJob
);


router.get(
    '/jobseeker/:jobSeekerId', 
    authenticateJWT, 
    ApplicationController.getApplicationsByJobSeeker
);


router.get(
    '/company/:companyId', 
    authenticateJWT, 
    ApplicationController.getApplicationsByCompany
);


export default router;
