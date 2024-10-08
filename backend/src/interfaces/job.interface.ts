import { JobType } from '../enums/enums';

export interface Job {
  id: string;
  companyId: string;
  jobFieldId: string;
  title: string;
  type: JobType;
  vacancies: number;
  deadline: Date;
  datePublished: Date;
  yearsOfExperience: string;
  description: string;
  salaryRange?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}