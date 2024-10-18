import { Router } from 'express';
import * as CertificationController from '../controllers/certification.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();


router.post(
    '/add', authenticateJWT, 
    CertificationController.addCertification
);


router.get(
    '/:certificationId', 
    authenticateJWT, 
    CertificationController.getCertificationById
);


router.patch(
    '/:certificationId', 
    authenticateJWT, 
    CertificationController.updateCertification
);


router.delete(
    '/:certificationId', 
    authenticateJWT, 
    CertificationController.deleteCertification
);


router.get(
    '/jobseeker/:jobSeekerId', 
    authenticateJWT, 
    CertificationController.getCertificationsByJobSeeker
);

export default router;
