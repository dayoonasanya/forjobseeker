
import { Request, Response, NextFunction } from 'express';
import * as ApplicationService from '../services/application.service';
import { AppError } from '../middlewares/error.middleware';
import { ApplicationStatus } from '../enums/enums';

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
 * Controller for creating an Application
 */
export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationData = req.body;
    const application = await ApplicationService.createApplication(applicationData);

    res.status(201).json({
      message: 'Application created successfully',
      application,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting an Application by ID
 */
export const getApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { applicationId } = req.params;
    const application = await ApplicationService.getApplicationById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }

    res.status(200).json({
      message: 'Application retrieved successfully',
      application,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating an Application Status
 */
export const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const updatedApplication = await ApplicationService.updateApplicationStatus(applicationId, status as ApplicationStatus);

    if (!updatedApplication) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }

    res.status(200).json({
      message: 'Application status updated successfully',
      updatedApplication,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting an Application
 */
export const deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { applicationId } = req.params;
    const isDeleted = await ApplicationService.deleteApplication(applicationId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }

    res.status(200).json({
      message: 'Application deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Applications by Job
 */
export const getApplicationsByJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const applications = await ApplicationService.getApplicationsByJob(jobId);

    res.status(200).json({
      message: 'Applications for the job retrieved successfully',
      applications,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Applications by Job Seeker
 */
export const getApplicationsByJobSeeker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const applications = await ApplicationService.getApplicationsByJobSeeker(jobSeekerId);

    res.status(200).json({
      message: 'Applications by the job seeker retrieved successfully',
      applications,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};


/**
 * Controller for getting Applications by Company
 */
export const getApplicationsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const applications = await ApplicationService.getApplicationsByCompany(companyId);

    res.status(200).json({
      message: 'Applications for the company retrieved successfully',
      applications,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

