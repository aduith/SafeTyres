import express from 'express';
import {
    submitReview,
    getApprovedReviews,
    getAllReviews,
    updateReviewStatus,
    deleteReview,
} from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = express.Router();

// Public routes
router.post('/', submitReview);
router.get('/approved', getApprovedReviews);

// Admin routes
router.get('/all', authenticate, requireAdmin, getAllReviews);
router.patch('/:id/status', authenticate, requireAdmin, updateReviewStatus);
router.delete('/:id', authenticate, requireAdmin, deleteReview);

export default router;
