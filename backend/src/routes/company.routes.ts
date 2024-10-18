import { Router } from 'express';
import * as CompanyController from '../controllers/company.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();


router.post(
  '/create',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.createCompanyProfile
);


router.get(
  '/:companyId', 
  authenticateJWT, 
  CompanyController.getCompanyById
);


router.patch(
  '/:companyId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.updateCompanyProfile
);


router.delete(
  '/:companyId',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN, UserRole.COMPANY]),
  CompanyController.deleteCompanyProfile
);


router.post(
  '/:companyId/verify',
  authenticateJWT,
  authorizeRole([UserRole.ADMIN]),
  CompanyController.verifyCompany
);


router.get(
  '/:companyId/jobs',
  authenticateJWT,
  CompanyController.getCompanyJobs
);

export default router;


router.get(
  '/', 
  authenticateJWT, 
  CompanyController.getAllCompanies
);

