import { ApplicationStatus } from '../enums/enums';

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}