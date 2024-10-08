// src/services/certification.service.ts

import prisma from '../config/database.config';
import { Certification } from '../interfaces/certification.interface';

/**
 * Helper function to map Prisma Certification to custom Certification interface
 */
const mapToCertification = (prismaCertification: any): Certification => {
  return {
    id: prismaCertification.id,
    jobSeekerId: prismaCertification.jobSeekerId,
    jobSeeker: prismaCertification.jobSeeker,
    name: prismaCertification.name,
    issuer: prismaCertification.issuer,
    issueDate: prismaCertification.issueDate,
    expiryDate: prismaCertification.expiryDate || null,
    link: prismaCertification.link || null,
    createdAt: prismaCertification.createdAt,
    updatedAt: prismaCertification.updatedAt,
    isDeleted: prismaCertification.isDeleted,
  };
};

/**
 * Add Certification
 */
export const addCertification = async (certificationData: any): Promise<Certification | null> => {
  try {
    const newCertification = await prisma.certification.create({
      data: {
        jobSeekerId: certificationData.jobSeekerId,
        name: certificationData.name,
        issuer: certificationData.issuer,
        issueDate: certificationData.issueDate,
        expiryDate: certificationData.expiryDate || null,
        link: certificationData.link || null,
      },
      include: {
        jobSeeker: true,
      },
    });
    return mapToCertification(newCertification);
  } catch (error) {
    throw new Error('Error adding Certification');
  }
};

/**
 * Get Certification by ID
 */
export const getCertificationById = async (certificationId: string): Promise<Certification | null> => {
  try {
    const certification = await prisma.certification.findUnique({
      where: { id: certificationId },
      include: {
        jobSeeker: true,
      },
    });

    return certification && !certification.isDeleted ? mapToCertification(certification) : null;
  } catch (error) {
    throw new Error('Error retrieving Certification by ID');
  }
};

/**
 * Update Certification
 */
export const updateCertification = async (
  certificationId: string,
  certificationData: Partial<Certification>
): Promise<Certification | null> => {
  try {
    const updatedCertification = await prisma.certification.update({
      where: { id: certificationId },
      data: {
        name: certificationData.name,
        issuer: certificationData.issuer,
        issueDate: certificationData.issueDate,
        expiryDate: certificationData.expiryDate || null,
        link: certificationData.link || null,
      },
      include: {
        jobSeeker: true,
      },
    });
    return mapToCertification(updatedCertification);
  } catch (error) {
    throw new Error('Error updating Certification');
  }
};

/**
 * Soft delete Certification
 */
export const deleteCertification = async (certificationId: string): Promise<boolean> => {
  try {
    await prisma.certification.update({
      where: { id: certificationId },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    throw new Error('Error soft deleting Certification');
  }
};

/**
 * Get Certifications by Job Seeker
 */
export const getCertificationsByJobSeeker = async (jobSeekerId: string): Promise<Certification[]> => {
  try {
    const certifications = await prisma.certification.findMany({
      where: { jobSeekerId, isDeleted: false },
      include: {
        jobSeeker: true,
      },
    });
    return certifications.map(mapToCertification);
  } catch (error) {
    throw new Error('Error retrieving Certifications by Job Seeker');
  }
};
