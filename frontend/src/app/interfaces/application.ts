import { Job } from './job';
import { JobSeeker } from './jobseeker';

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  jobSeekerId: string;
  jobSeeker: JobSeeker;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export enum ApplicationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
  }