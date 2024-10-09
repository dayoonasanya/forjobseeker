// src/routes/auth.routes.ts

import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Route for user registration
router.post('/register', AuthController.register);

// Route for user login
router.post('/login', AuthController.login);

// Route for resetting password while logged in (requires authentication)
router.post('/reset-password', authenticateJWT, AuthController.resetPassword);

// Route for initiating forgot password process
router.post('/forgot-password', AuthController.forgotPassword);

// Route for resetting password using a token or code
router.post('/reset-password-with-token', AuthController.resetPasswordWithToken);

export default router;
