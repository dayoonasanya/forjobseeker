// src/services/company.service.ts

import prisma from '../config/database.config';
import { Company } from '../interfaces/company.interface';

/**
 * Helper function to map Prisma Company to custom Company interface
 */
const mapToCompany = (prismaCompany: any): Company => {
  return {
    id: prismaCompany.id,
    userId: prismaCompany.userId,
    user: prismaCompany.user,
    name: prismaCompany.name,
    website: prismaCompany.website || null,
    country: prismaCompany.country,
    businessEmail: prismaCompany.businessEmail,
    licenseNumber: prismaCompany.licenseNumber,
    isVerified: prismaCompany.isVerified,
    about: prismaCompany.about || null,
    logo: prismaCompany.logo || null,
    jobs: prismaCompany.jobs,
    createdAt: prismaCompany.createdAt,
    updatedAt: prismaCompany.updatedAt,
    isDeleted: prismaCompany.isDeleted,
  };
};

/**
 * Create Company Profile
 */
export const createCompanyProfile = async (companyData: any): Promise<Company | null> => {
  try {
    const newCompany = await prisma.company.create({
      data: {
        userId: companyData.userId,
        name: companyData.name,
        website: companyData.website || null,
        country: companyData.country,
        businessEmail: companyData.businessEmail,
        licenseNumber: companyData.licenseNumber,
        about: companyData.about || null,
        logo: companyData.logo || null,
      },
      include: {
        user: true,
        jobs: true,
      },
    });
    return mapToCompany(newCompany);
  } catch (error) {
    throw new Error('Error creating Company profile');
  }
};

/**
 * Get Company by ID
 */
export const getCompanyById = async (companyId: string): Promise<Company | null> => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        user: true,
        jobs: true,
      },
    });

    return company && !company.isDeleted ? mapToCompany(company) : null;
  } catch (error) {
    throw new Error('Error retrieving Company by ID');
  }
};

/**
 * Update Company Profile
 */
export const updateCompanyProfile = async (
  companyId: string,
  companyData: Partial<Company>
): Promise<Company | null> => {
  try {
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        name: companyData.name,
        website: companyData.website || null,
        country: companyData.country,
        businessEmail: companyData.businessEmail,
        licenseNumber: companyData.licenseNumber,
        about: companyData.about || null,
        logo: companyData.logo || null,
      },
      include: {
        user: true,
        jobs: true,
      },
    });
    return mapToCompany(updatedCompany);
  } catch (error) {
    throw new Error('Error updating Company profile');
  }
};

/**
 * Soft delete Company Profile
 */
export const deleteCompanyProfile = async (companyId: string): Promise<boolean> => {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting Company profile');
  }
};

/**
 * Verify Company
 */
export const verifyCompany = async (companyId: string): Promise<boolean> => {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: { isVerified: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error verifying Company');
  }
};

/**
 * Get Company Jobs
 */
export const getCompanyJobs = async (companyId: string) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { companyId, isDeleted: false },
    });
    return jobs;
  } catch (error) {
    throw new Error('Error retrieving Company jobs');
  }
};
