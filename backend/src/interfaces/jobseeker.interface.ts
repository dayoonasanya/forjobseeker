export interface JobSeeker {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  jobFieldId: string;
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
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}