export interface Certification {
  id: string;
  jobSeekerId: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}