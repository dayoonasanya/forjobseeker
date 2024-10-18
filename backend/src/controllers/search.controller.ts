import { Request, Response, NextFunction } from 'express';
import * as SearchService from '../services/search.service';
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
 * Controller for searching Jobs with filters
 */
export const searchJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query;
    const jobs = await SearchService.searchJobs(filters);

    res.status(200).json({
      message: 'Jobs retrieved successfully',
      jobs,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for searching Job Seekers with filters (for company use)
 */
export const searchJobSeekers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query;
    const jobSeekers = await SearchService.searchJobSeekers(filters);

    res.status(200).json({
      message: 'Job Seekers retrieved successfully',
      jobSeekers,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for searching Companies with filters
 */
export const searchCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query;
    const companies = await SearchService.searchCompanies(filters);

    res.status(200).json({
      message: 'Companies retrieved successfully',
      companies,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};
