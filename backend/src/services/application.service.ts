// src/services/application.service.ts

import prisma from '../config/database.config';
import { Application } from '../interfaces/application.interface';
import { ApplicationStatus } from '../enums/enums';

/**
 * Helper function to map Prisma Application to custom Application interface
 */
const mapToApplication = (prismaApplication: any): Application => {
  return {
    id: prismaApplication.id,
    jobId: prismaApplication.jobId,
    job: prismaApplication.job,
    jobSeekerId: prismaApplication.jobSeekerId,
    jobSeeker: prismaApplication.jobSeeker,
    status: prismaApplication.status as ApplicationStatus,
    appliedAt: prismaApplication.appliedAt,
    updatedAt: prismaApplication.updatedAt,
    isDeleted: prismaApplication.isDeleted,
  };
};

/**
 * Create Application
 */
export const createApplication = async (applicationData: any): Promise<Application | null> => {
  try {
    const newApplication = await prisma.application.create({
      data: {
        jobId: applicationData.jobId,
        jobSeekerId: applicationData.jobSeekerId,
        status: applicationData.status || ApplicationStatus.PENDING,
        appliedAt: new Date(),
      },
      include: {
        job: true,
        jobSeeker: true,
      },
    });
    return mapToApplication(newApplication);
  } catch (error) {
    throw new Error('Error creating Application');
  }
};

/**
 * Get Application by ID
 */
export const getApplicationById = async (applicationId: string): Promise<Application | null> => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: true,
        jobSeeker: true,
      },
    });

    return application && !application.isDeleted ? mapToApplication(application) : null;
  } catch (error) {
    throw new Error('Error retrieving Application by ID');
  }
};

/**
 * Update Application Status
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<Application | null> => {
  try {
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        updatedAt: new Date(),
      },
      include: {
        job: true,
        jobSeeker: true,
      },
    });
    return mapToApplication(updatedApplication);
  } catch (error) {
    throw new Error('Error updating Application status');
  }
};

/**
 * Soft delete Application
 */
export const deleteApplication = async (applicationId: string): Promise<boolean> => {
  try {
    await prisma.application.update({
      where: { id: applicationId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting Application');
  }
};

/**
 * Get Applications by Job
 */
export const getApplicationsByJob = async (jobId: string): Promise<Application[]> => {
  try {
    const applications = await prisma.application.findMany({
      where: { jobId, isDeleted: false },
      include: {
        job: true,
        jobSeeker: true,
      },
    });
    return applications.map(mapToApplication);
  } catch (error) {
    throw new Error('Error retrieving Applications by Job');
  }
};

/**
 * Get Applications by Job Seeker
 */
export const getApplicationsByJobSeeker = async (jobSeekerId: string): Promise<Application[]> => {
  try {
    const applications = await prisma.application.findMany({
      where: { jobSeekerId, isDeleted: false },
      include: {
        job: true,
        jobSeeker: true,
      },
    });
    return applications.map(mapToApplication);
  } catch (error) {
    throw new Error('Error retrieving Applications by Job Seeker');
  }
};
