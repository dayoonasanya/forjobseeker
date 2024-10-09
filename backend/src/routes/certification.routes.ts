// src/routes/certification.routes.ts

import { Router } from 'express';
import * as CertificationController from '../controllers/certification.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Route for adding a certification
router.post('/add', authenticateJWT, CertificationController.addCertification);

// Route for getting a certification by ID
router.get('/:certificationId', authenticateJWT, CertificationController.getCertificationById);

// Route for updating a certification
router.patch('/:certificationId', authenticateJWT, CertificationController.updateCertification);

// Route for soft deleting a certification
router.delete('/:certificationId', authenticateJWT, CertificationController.deleteCertification);

// Route for getting certifications by job seeker
router.get('/jobseeker/:jobSeekerId', authenticateJWT, CertificationController.getCertificationsByJobSeeker);

export default router;
