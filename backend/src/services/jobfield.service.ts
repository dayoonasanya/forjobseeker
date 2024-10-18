import prisma from '../config/database.config';
import { JobField } from '../interfaces/jobfield.interface';

/**
 * Helper function
 */
const mapToJobField = (prismaJobField: any): JobField => {
  return {
    id: prismaJobField.id,
    name: prismaJobField.name,
    jobSeekers: prismaJobField.jobSeekers || [],
    jobs: prismaJobField.jobs || [],
    createdAt: prismaJobField.createdAt,
    updatedAt: prismaJobField.updatedAt,
    isDeleted: prismaJobField.isDeleted,
  };
};

/**
 * Create Job Field
 */
export const createJobField = async (jobFieldData: any): Promise<JobField | null> => {
  try {
    const newJobField = await prisma.jobField.create({
      data: {
        name: jobFieldData.name,
      },
      include: {
        jobSeekers: true,
        jobs: true,
      },
    });
    return mapToJobField(newJobField);
  } catch (error) {
    throw new Error('Error creating Job Field');
  }
};

/**
 * Get Job Field by ID
 */
export const getJobFieldById = async (jobFieldId: string): Promise<JobField | null> => {
  try {
    const jobField = await prisma.jobField.findUnique({
      where: { id: jobFieldId },
      include: {
        jobSeekers: true,
        jobs: true,
      },
    });

    return jobField && !jobField.isDeleted ? mapToJobField(jobField) : null;
  } catch (error) {
    throw new Error('Error retrieving Job Field by ID');
  }
};

/**
 * Get All Job Fields
 */
export const getAllJobFields = async (): Promise<JobField[]> => {
  try {
    const jobFields = await prisma.jobField.findMany({
      where: { isDeleted: false },
      include: {
        jobSeekers: true,
        jobs: true,
      },
    });
    return jobFields.map(mapToJobField);
  } catch (error) {
    throw new Error('Error retrieving all Job Fields');
  }
};

/**
 * Update Job Field
 */
export const updateJobField = async (
  jobFieldId: string,
  jobFieldData: Partial<JobField>
): Promise<JobField | null> => {
  try {
    const updatedJobField = await prisma.jobField.update({
      where: { id: jobFieldId },
      data: {
        name: jobFieldData.name,
      },
      include: {
        jobSeekers: true,
        jobs: true,
      },
    });
    return mapToJobField(updatedJobField);
  } catch (error) {
    throw new Error('Error updating Job Field');
  }
};

/**
 * Soft delete Job Field
 */
export const deleteJobField = async (jobFieldId: string): Promise<boolean> => {
  try {
    await prisma.jobField.update({
      where: { id: jobFieldId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting Job Field');
  }
};
