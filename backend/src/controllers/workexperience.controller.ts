
import { Request, Response, NextFunction } from 'express';
import * as WorkExperienceService from '../services/workexperience.service';
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
 * Controller for adding a new Work Experience
 */
export const addWorkExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workExperienceData = req.body;
    const workExperience = await WorkExperienceService.addWorkExperience(workExperienceData);

    res.status(201).json({
      message: 'Work Experience added successfully',
      workExperience,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a Work Experience by ID
 */
export const getWorkExperienceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { workExperienceId } = req.params;
    const workExperience = await WorkExperienceService.getWorkExperienceById(workExperienceId);

    if (!workExperience) {
      return res.status(404).json({
        message: 'Work Experience not found',
      });
    }

    res.status(200).json({
      message: 'Work Experience retrieved successfully',
      workExperience,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a Work Experience
 */
export const updateWorkExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { workExperienceId } = req.params;
    const workExperienceData = req.body;
    const updatedWorkExperience = await WorkExperienceService.updateWorkExperience(workExperienceId, workExperienceData);

    if (!updatedWorkExperience) {
      return res.status(404).json({
        message: 'Work Experience not found',
      });
    }

    res.status(200).json({
      message: 'Work Experience updated successfully',
      updatedWorkExperience,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a Work Experience
 */
export const deleteWorkExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { workExperienceId } = req.params;
    const isDeleted = await WorkExperienceService.deleteWorkExperience(workExperienceId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Work Experience not found',
      });
    }

    res.status(200).json({
      message: 'Work Experience deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Work Experiences by Job Seeker
 */
export const getWorkExperiencesByJobSeeker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobSeekerId } = req.params;
    const workExperiences = await WorkExperienceService.getWorkExperiencesByJobSeeker(jobSeekerId);

    res.status(200).json({
      message: 'Work Experiences retrieved successfully',
      workExperiences,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
