// src/services/auth.service.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.config';
import { generateToken } from '../config/jwt.config';
import { env } from '../config/env.config';
import logger from '../config/logger.config';
import { UserRole } from '../enums/enums';

/**
 * Register a new user (JobSeeker or Company)
 */
export const register = async (userData: any): Promise<any> => {
  const { email, password, role, ...profileData } = userData;

  // Check if the email is already in use
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user with the basic information
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  // Create additional profile information based on the role
  if (role === UserRole.JOBSEEKER) {
    await prisma.jobSeeker.create({
      data: {
        userId: user.id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        jobFieldId: profileData.jobFieldId,
        maxQualification: profileData.maxQualification,
        yearsOfExperience: profileData.yearsOfExperience,
      },
    });
  } else if (role === UserRole.COMPANY) {
    await prisma.company.create({
      data: {
        userId: user.id,
        name: profileData.companyName,
        website: profileData.website,
        country: profileData.country,
        businessEmail: profileData.businessEmail,
        licenseNumber: profileData.licenseNumber,
      },
    });
  }

  return user;
};

/**
 * Login function to authenticate a user
 */
export const login = async (email: string, password: string): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token for authenticated user
  const token = generateToken(user.id, user.role);
  return token;
};

/**
 * Reset password while logged in
 */
export const resetPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    throw new Error('Invalid old password');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });
};

/**
 * Forgot password function to initiate password reset process
 */
export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User with this email does not exist');
  }

  // Here, implement your logic to send an email to the user with a reset password link or code
  logger.info(`Password reset email sent to ${email}`);
};

/**
 * Reset password using token or code
 */
export const resetPasswordWithToken = async (token: string, newPassword: string): Promise<void> => {
  try {
    const decoded: any = jwt.verify(token, env.jwtSecret);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedNewPassword },
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
