// src/services/search.service.ts

import prisma from '../config/database.config';
import { Job } from '../interfaces/job.interface';
import { JobSeeker } from '../interfaces/jobseeker.interface';
import { Company } from '../interfaces/company.interface';

/**
 * Helper function to map Prisma Job to custom Job interface
 */
const mapToJob = (prismaJob: any): Job => {
  return {
    id: prismaJob.id,
    companyId: prismaJob.companyId,
    company: {
      ...prismaJob.company,
      user: prismaJob.company.user,
      jobs: prismaJob.company.jobs || [],
    },
    jobFieldId: prismaJob.jobFieldId,
    jobField: prismaJob.jobField,
    title: prismaJob.title,
    type: prismaJob.type,
    vacancies: prismaJob.vacancies,
    deadline: prismaJob.deadline,
    datePublished: prismaJob.datePublished,
    yearsOfExperience: prismaJob.yearsOfExperience,
    description: prismaJob.description,
    salaryRange: prismaJob.salaryRange || null,
    applications: prismaJob.applications || [],
    createdAt: prismaJob.createdAt,
    updatedAt: prismaJob.updatedAt,
    isDeleted: prismaJob.isDeleted,
  };
};

/**
 * Helper function to map Prisma JobSeeker to custom JobSeeker interface
 */
const mapToJobSeeker = (prismaJobSeeker: any): JobSeeker => {
  return {
    id: prismaJobSeeker.id,
    userId: prismaJobSeeker.userId,
    user: prismaJobSeeker.user,
    firstName: prismaJobSeeker.firstName,
    lastName: prismaJobSeeker.lastName,
    phone: prismaJobSeeker.phone || null,
    jobFieldId: prismaJobSeeker.jobFieldId,
    jobField: prismaJobSeeker.jobField,
    maxQualification: prismaJobSeeker.maxQualification,
    yearsOfExperience: prismaJobSeeker.yearsOfExperience,
    profileImage: prismaJobSeeker.profileImage || null,
    summary: prismaJobSeeker.summary || null,
    skills: prismaJobSeeker.skills || [],
    cv: prismaJobSeeker.cv || null,
    twitterLink: prismaJobSeeker.twitterLink || null,
    linkedinLink: prismaJobSeeker.linkedinLink || null,
    githubLink: prismaJobSeeker.githubLink || null,
    website: prismaJobSeeker.website || null,
    applications: prismaJobSeeker.applications || [],
    workExperiences: prismaJobSeeker.workExperiences || [],
    certifications: prismaJobSeeker.certifications || [],
    createdAt: prismaJobSeeker.createdAt,
    updatedAt: prismaJobSeeker.updatedAt,
    isDeleted: prismaJobSeeker.isDeleted,
  };
};

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
    jobs: prismaCompany.jobs || [],
    createdAt: prismaCompany.createdAt,
    updatedAt: prismaCompany.updatedAt,
    isDeleted: prismaCompany.isDeleted,
  };
};

/**
 * Search Jobs with various filters
 */
export const searchJobs = async (filters: any = {}): Promise<Job[]> => {
  try {
    const { jobFieldId, companyId, title, country, type, yearsOfExperience } = filters;

    const jobs = await prisma.job.findMany({
      where: {
        isDeleted: false,
        jobFieldId: jobFieldId || undefined,
        companyId: companyId || undefined,
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
        company: {
          country: country || undefined,
        },
        type: type || undefined,
        yearsOfExperience: yearsOfExperience ? { contains: yearsOfExperience } : undefined,
      },
      include: {
        company: { include: { user: true } },
        jobField: true,
        applications: true,
      },
    });

    return jobs.map(mapToJob);
  } catch (error) {
    throw new Error('Error searching for Jobs');
  }
};

/**
 * Search Job Seekers with filters (for company use)
 */
export const searchJobSeekers = async (filters: any = {}): Promise<JobSeeker[]> => {
    try {
      const { jobFieldId, yearsOfExperience, maxQualification } = filters;
  
      const jobSeekers = await prisma.jobSeeker.findMany({
        where: {
          isDeleted: false,
          jobFieldId: jobFieldId || undefined,
          yearsOfExperience: yearsOfExperience ? { contains: yearsOfExperience } : undefined,
          maxQualification: maxQualification || undefined,
        },
        include: {
          user: true,
          jobField: true,
          applications: true,
          workExperiences: true,
          certifications: true,
        },
      });
  
      return jobSeekers.map(mapToJobSeeker);
    } catch (error) {
      throw new Error('Error searching for Job Seekers');
    }
  };

/**
 * Search Companies with filters
 */
export const searchCompanies = async (filters: any = {}): Promise<Company[]> => {
  try {
    const { name, country, isVerified } = filters;

    const companies = await prisma.company.findMany({
      where: {
        isDeleted: false,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        country: country || undefined,
        isVerified: isVerified !== undefined ? isVerified : undefined,
      },
      include: {
        user: true,
        jobs: true,
      },
    });

    return companies.map(mapToCompany);
  } catch (error) {
    throw new Error('Error searching for Companies');
  }
};
