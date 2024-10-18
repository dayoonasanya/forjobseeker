import { Router } from 'express';
import * as SearchController from '../controllers/search.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

router.get(
  '/jobs', 
  authenticateJWT, 
  SearchController.searchJobs
);


router.get(
  '/jobseekers',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  SearchController.searchJobSeekers
);

router.get(
  '/companies', 
  authenticateJWT, 
  SearchController.searchCompanies
);

export default router;
