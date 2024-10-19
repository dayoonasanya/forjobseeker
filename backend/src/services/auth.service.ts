import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.config';
import { generateToken } from '../config/jwt.config';
import { env } from '../config/env.config';
import logger from '../config/logger.config';
import { UserRole } from '../enums/enums';
import { sendWelcomeEmail } from '../emails/utils/welcome';

/**
 * Register a new user (JobSeeker or Company)
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


export const login = async (email: string, password: string): Promise<string> => {
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
 * Forgot password function to initiate password reset process
 */
export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User with this email does not exist');
  }

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
