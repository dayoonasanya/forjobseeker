export interface WorkExperience {
  id: string;
  jobSeekerId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}