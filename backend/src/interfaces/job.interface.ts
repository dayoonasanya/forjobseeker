import { Company } from './company.interface';
import { JobField } from './jobfield.interface';
import { Application } from './application.interface';
import { JobType } from '../enums/enums';

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
