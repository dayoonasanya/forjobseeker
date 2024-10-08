export interface Company {
  id: string;
  userId: string;
  name: string;
  website?: string;
  country: string;
  businessEmail: string;
  licenseNumber: string;
  isVerified: boolean;
  about?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}