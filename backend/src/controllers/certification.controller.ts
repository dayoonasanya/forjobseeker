// src/controllers/certification.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as CertificationService from '../services/certification.service';
import { AppError } from '../middlewares/error.middleware';

// Helper function to handle errors and return a proper JSON response
const handleControllerError = (error: any, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    });
  }

  res.status(500).json({
    message: error.message || 'Internal Server Error',
    status: 500,
  });
};

/**
 * Controller for adding a Certification
 */
export const addCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certificationData = req.body;
    const certification = await CertificationService.addCertification(certificationData);

    res.status(201).json({
      message: 'Certification added successfully',
      certification,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a Certification by ID
 */
export const getCertificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { certificationId } = req.params;
    const certification = await CertificationService.getCertificationById(certificationId);

    if (!certification) {
      return res.status(404).json({
        message: 'Certification not found',
      });
    }

    res.status(200).json({
      message: 'Certification retrieved successfully',
      certification,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a Certification
 */
export const updateCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { certificationId } = req.params;
    const certificationData = req.body;
    const updatedCertification = await CertificationService.updateCertification(certificationId, certificationData);

    if (!updatedCertification) {
      return res.status(404).json({
        message: 'Certification not found',
      });
    }

    res.status(200).json({
      message: 'Certification updated successfully',
      updatedCertification,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a Certification
 */
export const deleteCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { certificationId } = req.params;
    const isDeleted = await CertificationService.deleteCertification(certificationId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Certification not found',
      });
    }

    res.status(200).json({
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Certifications by Job Seeker
 */
export const getCertificationsByJobSeeker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const certifications = await CertificationService.getCertificationsByJobSeeker(jobSeekerId);

    res.status(200).json({
      message: 'Certifications retrieved successfully',
      certifications,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
