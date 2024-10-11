export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}


export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  JOBSEEKER = 'JOBSEEKER'
}