import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Get total counts
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Calculate total revenue
        const revenueData = await Order.aggregate([
            { $match: { orderStatus: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        // Get order status breakdown
        const ordersByStatus = await Order.aggregate([
            {
                $group: {
                    _id: '$orderStatus',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Get recent orders
        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(10)
            .select('_id customerInfo totalAmount orderStatus createdAt');

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalOrders,
                    totalRevenue,
                    totalUsers,
                    totalProducts,
                },
                ordersByStatus,
                recentOrders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
