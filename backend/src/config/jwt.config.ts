import { env } from './env.config';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string, companyId?: string | null, jobSeekerId?: string | null) => {
  const payload: {
    userId: string;
    role: string;
    companyId?: string;
    jobSeekerId?: string;
  } = {
    userId,
    role,
  };

  if (companyId) {
    payload.companyId = companyId;
  }

  if (jobSeekerId) {
    payload.jobSeekerId = jobSeekerId;
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn: '1h' });
};



export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};