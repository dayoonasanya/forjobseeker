import { JobSeeker } from './jobseeker.interface';

export interface WorkExperience {
  id: string;
  jobSeekerId: string;
  jobSeeker: JobSeeker;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}