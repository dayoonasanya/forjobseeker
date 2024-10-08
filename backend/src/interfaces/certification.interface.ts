import { JobSeeker } from './jobseeker.interface';

export interface Certification {
  id: string;
  jobSeekerId: string;
  jobSeeker: JobSeeker;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}