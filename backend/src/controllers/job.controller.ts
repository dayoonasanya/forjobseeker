// src/controllers/job.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as JobService from '../services/job.service';
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
 * Controller for creating a Job
 */
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobData = req.body;
    const job = await JobService.createJob(jobData);

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a Job by ID
 */
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const job = await JobService.getJobById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job retrieved successfully',
      job,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a Job
 */
export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const jobData = req.body;
    const updatedJob = await JobService.updateJob(jobId, jobData);

    if (!updatedJob) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job updated successfully',
      updatedJob,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a Job
 */
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const isDeleted = await JobService.deleteJob(jobId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting the total count of Jobs without filters
 */
export const getTotalJobsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalJobsCount = await JobService.getAllJobs();
    res.status(200).json({
      message: 'Total jobs count retrieved successfully',
      totalJobs: totalJobsCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for getting Jobs by Company
 */
export const getJobsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const jobs = await JobService.getJobsByCompany(companyId);

    res.status(200).json({
      message: 'Jobs by company retrieved successfully',
      jobs,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Jobs by Job Field
 */
export const getJobsByJobField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobFieldId } = req.params;
    const jobs = await JobService.getJobsByJobField(jobFieldId);

    res.status(200).json({
      message: 'Jobs by job field retrieved successfully',
      jobs,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting all Jobs without filters
 */
export const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.status(200).json({
      message: 'All jobs retrieved successfully',
      jobs,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
