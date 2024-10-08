import { UserRole } from '../enums/enums';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
