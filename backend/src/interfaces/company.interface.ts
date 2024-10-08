import { User } from './user.interface';
import { Job } from './job.interface';

export interface Company {
  id: string;
  userId: string;
  user: User;
  name: string;
  website?: string;
  country: string;
  businessEmail: string;
  licenseNumber: string;
  isVerified: boolean;
  about?: string;
  logo?: string;
  jobs: Job[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
