import { Job } from './job.interface';
import { JobSeeker } from './jobseeker.interface';

export interface JobField {
  id: string;
  name: string;
  jobSeekers: JobSeeker[];
  jobs: Job[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}