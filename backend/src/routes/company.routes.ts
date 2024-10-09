// src/routes/company.routes.ts

import { Router } from 'express';
import * as CompanyController from '../controllers/company.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route for creating a company profile
router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.createCompanyProfile
);

// Route for getting a company by ID
router.get('/:companyId', authenticateJWT, CompanyController.getCompanyById);

// Route for updating a company profile
router.patch(
  '/:companyId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.updateCompanyProfile
);

// Route for soft deleting a company profile
router.delete(
  '/:companyId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.deleteCompanyProfile
);

// Route for verifying a company
router.post(
  '/:companyId/verify',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  CompanyController.verifyCompany
);

// Route for getting jobs by company
router.get('/:companyId/jobs', authenticateJWT, CompanyController.getCompanyJobs);

export default router;
