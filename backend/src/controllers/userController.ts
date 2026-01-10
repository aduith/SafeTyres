import { Request, Response } from 'express';
import User from '../models/User';

// Admin: Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Admin: Update user role
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            res.status(400).json({
                success: false,
                message: 'Invalid role. Must be "user" or "admin"',
            });
            return;
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user role',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
