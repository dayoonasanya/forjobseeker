// src/controllers/company.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as CompanyService from '../services/company.service';
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
 * Controller for creating a Company Profile
 */
export const createCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyData = req.body;
    const company = await CompanyService.createCompanyProfile(companyData);

    res.status(201).json({
      message: 'Company profile created successfully',
      company,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting a Company by ID
 */
export const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const company = await CompanyService.getCompanyById(companyId);

    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }

    res.status(200).json({
      message: 'Company retrieved successfully',
      company,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for updating a Company Profile
 */
export const updateCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const companyData = req.body;
    const updatedCompany = await CompanyService.updateCompanyProfile(companyId, companyData);

    if (!updatedCompany) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }

    res.status(200).json({
      message: 'Company profile updated successfully',
      updatedCompany,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for soft deleting a Company Profile
 */
export const deleteCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const isDeleted = await CompanyService.deleteCompanyProfile(companyId);

    if (!isDeleted) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }

    res.status(200).json({
      message: 'Company profile deleted successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for verifying a Company
 */
export const verifyCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const isVerified = await CompanyService.verifyCompany(companyId);

    if (!isVerified) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }

    res.status(200).json({
      message: 'Company verified successfully',
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};

/**
 * Controller for getting Company Jobs
 */
export const getCompanyJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const jobs = await CompanyService.getCompanyJobs(companyId);

    res.status(200).json({
      message: 'Company jobs retrieved successfully',
      jobs,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};



/**
 * Controller for getting all Companies
 */
export const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    
    res.status(200).json({
      message: 'Companies retrieved successfully',
      companies,
    });
  } catch (error) {
    handleControllerError(error, res, next);
  }
};