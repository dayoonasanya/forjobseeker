import { User } from './user.interface';
import { JobField } from './jobfield.interface';
import { Application } from './application.interface';
import { WorkExperience } from './workexperience.interface';
import { Certification } from './certification.interface';

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
