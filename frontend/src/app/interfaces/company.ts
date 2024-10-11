import { User } from './user';
import { Job } from './job';

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
