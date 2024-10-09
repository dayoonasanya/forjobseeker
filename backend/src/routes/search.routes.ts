// src/routes/search.routes.ts

import { Router } from 'express';
import * as SearchController from '../controllers/search.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import { UserRole } from '../enums/enums';

const router = Router();

// Route for searching jobs with filters
router.get('/jobs', authenticateJWT, SearchController.searchJobs);

// Route for searching job seekers (for companies use)
router.get(
  '/jobseekers',
  authenticateJWT,
  authorizeRole([UserRole.COMPANY, UserRole.ADMIN]),
  SearchController.searchJobSeekers
);

// Route for searching companies
router.get('/companies', authenticateJWT, SearchController.searchCompanies);

export default router;
