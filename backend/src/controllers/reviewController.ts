import { Request, Response } from 'express';
import Review from '../models/Review';

// Submit a new review (public)
export const submitReview = async (req: Request, res: Response) => {
    try {
        const { name, email, rating, comment } = req.body;

        const review = await Review.create({
            name,
            email,
            rating,
            comment,
            status: 'pending',
        });

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully! It will be visible after approval.',
            data: { review },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to submit review',
        });
    }
};

// Get approved reviews (public)
export const getApprovedReviews = async (_req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: { reviews },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch reviews',
        });
    }
};

// Get all reviews (admin)
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const filter: any = {};

        if (status && ['pending', 'approved', 'rejected'].includes(status as string)) {
            filter.status = status;
        }

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: { reviews },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch reviews',
        });
    }
};

// Update review status (admin)
export const updateReviewStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            res.status(400).json({
                success: false,
                message: 'Invalid status. Must be pending, approved, or rejected',
            });
            return;
        }

        const review = await Review.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!review) {
            res.status(404).json({
                success: false,
                message: 'Review not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: `Review ${status} successfully`,
            data: { review },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update review status',
        });
    }
};

// Delete review (admin)
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            res.status(404).json({
                success: false,
                message: 'Review not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete review',
        });
    }
};
