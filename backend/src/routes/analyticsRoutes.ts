import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate, requireAdmin);

router.get('/dashboard', getDashboardStats);

export default router;
