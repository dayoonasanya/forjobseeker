import bcrypt from 'bcryptjs';
import jwt, { sign, verify } from 'jsonwebtoken';
import prisma from '../config/database.config';
import { generateToken } from '../config/jwt.config';
import { env } from '../config/env.config';
import logger from '../config/logger.config';
import { UserRole } from '../enums/enums';
import { sendWelcomeEmail } from '../emails/utils/welcome';
import { AppError } from '../middlewares';
import { sendResetPasswordEmail } from '../emails/utils/reset-password';

/**
 * Register a new user
 */
export const register = async (userData: any): Promise<any> => {
  const { 
    email, 
    password, 
    role, 
    ...profileData 
  } = userData;

  const existingUser = await prisma.user.findUnique(
    { 
      where: { email } 
    });
  if (existingUser) {
    throw new Error(
      'Email is already in use'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

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

  const mappedUser = {
    ...user,
    role: user.role as unknown as UserRole,
  };

  try {
    await sendWelcomeEmail(
      mappedUser
    );
  } catch (error) {
    logger.error(
      'Error sending welcome email after registration:', error
    );
  }

  return user;
};


export const login = async (
  email: string, 
  password: string
): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  let companyId = null;
  let jobSeekerId = null;

  if (user.role === UserRole.COMPANY) {
    const company = await prisma.company.findUnique({ where: { userId: user.id } });
    if (company) {
      companyId = company.id;
    }
  }

  if (user.role === UserRole.JOBSEEKER) {
    const jobSeeker = await prisma.jobSeeker.findUnique({ where: { userId: user.id } });
    if (jobSeeker) {
      jobSeekerId = jobSeeker.id;
    }
  }

  const token = generateToken(user.id, user.role, companyId, jobSeekerId);
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
 * Forgot password (generates reset link)
 */
export const generatePasswordResetLink = async (
  email: string
): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const resetToken = sign(
    { email: user.email },
    env.jwtSecret,
    { expiresIn: '1h' }
  );

  
  await sendResetPasswordEmail(email, resetToken);
};


/**
 * Verifies the password reset token
 */
export const verifyResetToken = (
  token: string
): string => {
  try {
    const decoded = verify(token, env.jwtSecret) as { email: string };
    return decoded.email;
  } catch (error) {
    throw new AppError('Invalid or expired token', 400);
  }
};

/**
 * Reset password using a valid token
 */
export const resetPasswordWithToken = async (
  token: string, 
  newPassword: string
): Promise<void> => {
  const email = verifyResetToken(token);

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  });
};
