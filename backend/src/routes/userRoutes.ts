import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate, requireAdmin);

router.get('/', getAllUsers);
router.patch('/:id/role', updateUserRole);

export default router;
