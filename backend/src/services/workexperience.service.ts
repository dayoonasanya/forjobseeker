
import prisma from '../config/database.config';
import { WorkExperience } from '../interfaces/workexperience.interface';

/**
 * Helper function
 */
const mapToWorkExperience = (prismaWorkExperience: any): WorkExperience => {
  return {
    id: prismaWorkExperience.id,
    jobSeekerId: prismaWorkExperience.jobSeekerId,
    jobSeeker: prismaWorkExperience.jobSeeker,
    company: prismaWorkExperience.company,
    position: prismaWorkExperience.position,
    startDate: prismaWorkExperience.startDate,
    endDate: prismaWorkExperience.endDate || null,
    description: prismaWorkExperience.description || null,
    createdAt: prismaWorkExperience.createdAt,
    updatedAt: prismaWorkExperience.updatedAt,
    isDeleted: prismaWorkExperience.isDeleted,
  };
};

/**
 * Add Work Experience
 */
export const addWorkExperience = async (workExperienceData: any): Promise<WorkExperience | null> => {
  try {
    const newWorkExperience = await prisma.workExperience.create({
      data: {
        jobSeekerId: workExperienceData.jobSeekerId,
        company: workExperienceData.company,
        position: workExperienceData.position,
        startDate: new Date(workExperienceData.startDate),
        endDate: workExperienceData.endDate ? new Date(workExperienceData.endDate) : null,
        description: workExperienceData.description || null,
      },
      include: {
        jobSeeker: true,
      },
    });
    return mapToWorkExperience(newWorkExperience);
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      throw new Error(`Error adding Work Experience: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while adding Work Experience');
    }
  }
};

/**
 * Get Work Experience by ID
 */
export const getWorkExperienceById = async (workExperienceId: string): Promise<WorkExperience | null> => {
  try {
    const workExperience = await prisma.workExperience.findUnique({
      where: { id: workExperienceId },
      include: {
        jobSeeker: true,
      },
    });

    return workExperience && !workExperience.isDeleted ? mapToWorkExperience(workExperience) : null;
  } catch (error) {
    throw new Error('Error retrieving Work Experience by ID');
  }
};

/**
 * Update Work Experience
 */
export const updateWorkExperience = async (
  workExperienceId: string,
  workExperienceData: Partial<WorkExperience>
): Promise<WorkExperience | null> => {
  try {
    const updatedWorkExperience = await prisma.workExperience.update({
      where: { id: workExperienceId },
      data: {
        company: workExperienceData.company,
        position: workExperienceData.position,
        startDate: workExperienceData.startDate ? new Date(workExperienceData.startDate) : undefined,
        endDate: workExperienceData.endDate ? new Date(workExperienceData.endDate) : null,
        description: workExperienceData.description ?? undefined,
      },
      include: {
        jobSeeker: true,
      },
    });
    return mapToWorkExperience(updatedWorkExperience);
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      throw new Error(`Error updating Work Experience: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while updating Work Experience');
    }
  }
};

/**
 * Soft delete Work Experience
 */
export const deleteWorkExperience = async (workExperienceId: string): Promise<boolean> => {
  try {
    await prisma.workExperience.update({
      where: { id: workExperienceId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting Work Experience');
  }
};

/**
 * Get Work Experiences by Job Seeker
 */
export const getWorkExperiencesByJobSeeker = async (jobSeekerId: string): Promise<WorkExperience[]> => {
  try {
    const workExperiences = await prisma.workExperience.findMany({
      where: { jobSeekerId, isDeleted: false },
      include: {
        jobSeeker: true,
      },
    });
    return workExperiences.map(mapToWorkExperience);
  } catch (error) {
    throw new Error('Error retrieving Work Experiences by Job Seeker');
  }
};
