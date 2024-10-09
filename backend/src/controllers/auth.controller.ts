// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares';

// Helper function to handle errors and return a proper JSON response
const handleControllerError = (error: any, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    });
  }

  res.status(500).json({
    message: error.message || 'Internal Server Error',
    status: 500,
  });
};

/**
 * Controller for registering a new user (JobSeeker or Company)
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const user = await AuthService.register(userData);

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for user login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for resetting password while logged in
 */
export const resetPassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
  
      // Check if userId is defined, throw error if not
      if (!userId) {
        return res.status(400).json({
          message: 'User ID is missing or invalid. Please log in and try again.',
        });
      }
  
      const { oldPassword, newPassword } = req.body;
      await AuthService.resetPassword(userId, oldPassword, newPassword);
  
      res.status(200).json({
        message: 'Password reset successfully',
      });
    } catch (error) {
      handleControllerError(error, res, next);
    }
  };

/**
 * Controller for initiating forgot password process
 */
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await AuthService.forgotPassword(email);

    res.status(200).json({
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for resetting password using token or code
 */
export const resetPasswordWithToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    await AuthService.resetPasswordWithToken(token, newPassword);

    res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
