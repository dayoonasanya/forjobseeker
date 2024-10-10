import { Job } from './job';
import { JobSeeker } from './jobseeker';

export interface JobField {
  id: string;
  name: string;
  jobSeekers: JobSeeker[];
  jobs: Job[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}