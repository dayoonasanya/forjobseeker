import { Request, Response, NextFunction } from 'express';
import * as JobSeekerService from '../services/jobseeker.service';
import { AppError } from '../middlewares/error.middleware';

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
 * Controller for creating a JobSeeker profile
 */
export const createJobSeekerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobSeekerData = req.body;
    const jobSeeker = await JobSeekerService.createJobSeekerProfile(jobSeekerData);

    res.status(201).json({
      message: 'JobSeeker profile created successfully',
      jobSeeker,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a JobSeeker by ID
 */
export const getJobSeekerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const jobSeeker = await JobSeekerService.getJobSeekerById(jobSeekerId);

    if (!jobSeeker) {
      return res.status(404).json({
        message: 'JobSeeker not found',
      });
    }

    res.status(200).json({
      message: 'JobSeeker retrieved successfully',
      jobSeeker,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a JobSeeker profile
 */
export const updateJobSeekerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const jobSeekerData = req.body;
    const updatedJobSeeker = await JobSeekerService.updateJobSeekerProfile(jobSeekerId, jobSeekerData);

    if (!updatedJobSeeker) {
      return res.status(404).json({
        message: 'JobSeeker not found',
      });
    }

    res.status(200).json({
      message: 'JobSeeker profile updated successfully',
      updatedJobSeeker,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a JobSeeker profile
 */
export const deleteJobSeekerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const isDeleted = await JobSeekerService.deleteJobSeekerProfile(jobSeekerId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'JobSeeker not found',
      });
    }

    res.status(200).json({
      message: 'JobSeeker profile deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting JobSeeker applications
 */
export const getJobSeekerApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const applications = await JobSeekerService.getJobSeekerApplications(jobSeekerId);

    res.status(200).json({
      message: 'JobSeeker applications retrieved successfully',
      applications,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};


/**
 * Controller for getting all Job Seekers
 */
export const getAllJobSeekers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobSeekers = await JobSeekerService.getAllJobSeekers();
    res.status(200).json({
      message: 'Job Seekers retrieved successfully',
      jobSeekers,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
