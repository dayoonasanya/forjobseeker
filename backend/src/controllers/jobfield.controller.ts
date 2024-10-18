import { Request, Response, NextFunction } from 'express';
import * as JobFieldService from '../services/jobfield.service';
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
 * Controller for creating a Job Field
 */
export const createJobField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobFieldData = req.body;
    const jobField = await JobFieldService.createJobField(jobFieldData);

    res.status(201).json({
      message: 'Job Field created successfully',
      jobField,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a Job Field by ID
 */
export const getJobFieldById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobFieldId } = req.params;
    const jobField = await JobFieldService.getJobFieldById(jobFieldId);

    if (!jobField) {
      return res.status(404).json({
        message: 'Job Field not found',
      });
    }

    res.status(200).json({
      message: 'Job Field retrieved successfully',
      jobField,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting all Job Fields
 */
export const getAllJobFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobFields = await JobFieldService.getAllJobFields();

    res.status(200).json({
      message: 'Job Fields retrieved successfully',
      jobFields,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a Job Field
 */
export const updateJobField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobFieldId } = req.params;
    const jobFieldData = req.body;
    const updatedJobField = await JobFieldService.updateJobField(jobFieldId, jobFieldData);

    if (!updatedJobField) {
      return res.status(404).json({
        message: 'Job Field not found',
      });
    }

    res.status(200).json({
      message: 'Job Field updated successfully',
      updatedJobField,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a Job Field
 */
export const deleteJobField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobFieldId } = req.params;
    const isDeleted = await JobFieldService.deleteJobField(jobFieldId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Job Field not found',
      });
    }

    res.status(200).json({
      message: 'Job Field deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
