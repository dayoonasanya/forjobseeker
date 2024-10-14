import { Company } from './company';
import { JobField } from './jobfield';
import { Application } from './application';

export interface Job {
  id: string;
  companyId: string;
  company: Company;
  jobFieldId: string;
  jobField: JobField;
  title: string;
  type: JobType;
  vacancies: number;
  deadline: Date;
  datePublished: Date;
  yearsOfExperience: string;
  description: string;
  salaryRange?: string;
  applications: Application[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}


export enum JobType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    INTERNSHIP = 'INTERNSHIP'
}

export interface JobResponse {
  message: string;
  totalJobs: number;
}
