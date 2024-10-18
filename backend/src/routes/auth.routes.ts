import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();


router.post(
    '/register', 
    AuthController.register
);


router.post(
    '/login', 
    AuthController.login
);


router.post(
    '/reset-password', 
    authenticateJWT, 
    AuthController.resetPassword
);


router.post(
    '/forgot-password', 
    AuthController.forgotPassword
);


router.post(
    '/reset-password-with-token', 
    AuthController.resetPasswordWithToken
);

export default router;
