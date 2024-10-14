import prisma from '../config/database.config';
import { JobSeeker } from '../interfaces/jobseeker.interface';
import { UserRole } from '../enums/enums';


/**
 * Helper function to map Prisma JobSeeker to custom JobSeeker interface
 */
const mapToJobSeeker = (prismaJobSeeker: any): JobSeeker => {
  return {
    id: prismaJobSeeker.id,
    userId: prismaJobSeeker.userId,
    user: {
      id: prismaJobSeeker.user.id,
      email: prismaJobSeeker.user.email,
      password: prismaJobSeeker.user.password,
      role: prismaJobSeeker.user.role as UserRole, // Explicit conversion
      createdAt: prismaJobSeeker.user.createdAt,
      updatedAt: prismaJobSeeker.user.updatedAt,
      isDeleted: prismaJobSeeker.user.isDeleted,
    },
    firstName: prismaJobSeeker.firstName,
    lastName: prismaJobSeeker.lastName,
    phone: prismaJobSeeker.phone,
    jobFieldId: prismaJobSeeker.jobFieldId,
    jobField: prismaJobSeeker.jobField,
    maxQualification: prismaJobSeeker.maxQualification,
    yearsOfExperience: prismaJobSeeker.yearsOfExperience,
    profileImage: prismaJobSeeker.profileImage,
    summary: prismaJobSeeker.summary,
    skills: prismaJobSeeker.skills,
    cv: prismaJobSeeker.cv,
    twitterLink: prismaJobSeeker.twitterLink,
    linkedinLink: prismaJobSeeker.linkedinLink,
    githubLink: prismaJobSeeker.githubLink,
    website: prismaJobSeeker.website,
    applications: prismaJobSeeker.applications,
    workExperiences: prismaJobSeeker.workExperiences,
    certifications: prismaJobSeeker.certifications,
    createdAt: prismaJobSeeker.createdAt,
    updatedAt: prismaJobSeeker.updatedAt,
    isDeleted: prismaJobSeeker.isDeleted,
  };
};

/**
 * Create JobSeeker Profile
 */
export const createJobSeekerProfile = async (jobSeekerData: any): Promise<JobSeeker | null> => {
  try {
    const newJobSeeker = await prisma.jobSeeker.create({
      data: {
        userId: jobSeekerData.userId,
        firstName: jobSeekerData.firstName,
        lastName: jobSeekerData.lastName,
        phone: jobSeekerData.phone || null,
        jobFieldId: jobSeekerData.jobFieldId,
        maxQualification: jobSeekerData.maxQualification,
        yearsOfExperience: jobSeekerData.yearsOfExperience,
        profileImage: jobSeekerData.profileImage || null,
        summary: jobSeekerData.summary || null,
        skills: jobSeekerData.skills || [],
        cv: jobSeekerData.cv || null,
        twitterLink: jobSeekerData.twitterLink || null,
        linkedinLink: jobSeekerData.linkedinLink || null,
        githubLink: jobSeekerData.githubLink || null,
        website: jobSeekerData.website || null,
      },
      include: {
        user: true,
        jobField: true,
        applications: true,
        workExperiences: true,
        certifications: true,
      },
    });
    return mapToJobSeeker(newJobSeeker);
  } catch (error) {
    throw new Error('Error creating JobSeeker profile');
  }
};

/**
 * Get JobSeeker by ID
 */
export const getJobSeekerById = async (jobSeekerId: string): Promise<JobSeeker | null> => {
  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { id: jobSeekerId },
      include: {
        user: true,
        jobField: true,
        applications: true,
        workExperiences: true,
        certifications: true,
      },
    });

    return jobSeeker && !jobSeeker.isDeleted ? mapToJobSeeker(jobSeeker) : null;
  } catch (error) {
    throw new Error('Error retrieving JobSeeker by ID');
  }
};


/**
 * Update JobSeeker Profile
 */
export const updateJobSeekerProfile = async (
  jobSeekerId: string,
  jobSeekerData: Partial<JobSeeker>
): Promise<JobSeeker | null> => {
  try {
    const updatedJobSeeker = await prisma.jobSeeker.update({
      where: { id: jobSeekerId },
      data: {
        firstName: jobSeekerData.firstName,
        lastName: jobSeekerData.lastName,
        phone: jobSeekerData.phone || null,
        jobFieldId: jobSeekerData.jobFieldId,
        maxQualification: jobSeekerData.maxQualification,
        yearsOfExperience: jobSeekerData.yearsOfExperience,
        profileImage: jobSeekerData.profileImage || null,
        summary: jobSeekerData.summary || null,
        skills: jobSeekerData.skills || [],
        cv: jobSeekerData.cv || null,
        twitterLink: jobSeekerData.twitterLink || null,
        linkedinLink: jobSeekerData.linkedinLink || null,
        githubLink: jobSeekerData.githubLink || null,
        website: jobSeekerData.website || null,
      },
      include: {
        user: true,
        jobField: true,
        applications: true,
        workExperiences: true,
        certifications: true,
      },
    });
    return mapToJobSeeker(updatedJobSeeker);
  } catch (error) {
    throw new Error('Error updating JobSeeker profile');
  }
};

/**
 * Soft delete JobSeeker Profile
 */
export const deleteJobSeekerProfile = async (jobSeekerId: string): Promise<boolean> => {
  try {
    await prisma.jobSeeker.update({
      where: { id: jobSeekerId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting JobSeeker profile');
  }
};



/**
 * Get JobSeeker Applications
 */
export const getJobSeekerApplications = async (jobSeekerId: string) => {
  try {
    const applications = await prisma.application.findMany({
      where: { jobSeekerId },
      include: { job: true },
    });
    return applications;
  } catch (error) {
    throw new Error('Error retrieving JobSeeker applications');
  }
};


/**
 * Get All Job Seekers
 */
export const getAllJobSeekers = async (): Promise<JobSeeker[]> => {
  try {
    const jobSeekers = await prisma.jobSeeker.findMany({
      where: {
        isDeleted: false,
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
    throw new Error('Error retrieving all Job Seekers');
  }
};