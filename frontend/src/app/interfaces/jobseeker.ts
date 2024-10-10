import { User } from './user';
import { JobField } from './jobfield';
import { Application } from './application';
import { WorkExperience } from './workexperience';
import { Certification } from './certification';

export interface JobSeeker {
  id: string;
  userId: string;
  user: User;
  firstName: string;
  lastName: string;
  phone?: string;
  jobFieldId: string;
  jobField: JobField;
  maxQualification: string;
  yearsOfExperience: string;
  profileImage?: string;
  summary?: string;
  skills: string[];
  cv?: string;
  twitterLink?: string;
  linkedinLink?: string;
  githubLink?: string;
  website?: string;
  applications: Application[];
  workExperiences: WorkExperience[];
  certifications: Certification[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
