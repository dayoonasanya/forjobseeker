import { Job } from './job.interface';
import { JobSeeker } from './jobseeker.interface';
import { ApplicationStatus } from '../enums/enums';

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
