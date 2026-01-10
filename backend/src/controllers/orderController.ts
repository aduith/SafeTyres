import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }

        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }

        const { items, shippingAddress, paymentMethod } = req.body;

        // Validate and calculate total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                res.status(404).json({
                    success: false,
                    message: `Product ${item.productId} not found`,
                });
                return;
            }

            if (product.stock < item.quantity) {
                res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
                return;
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                size: product.size,
                quantity: item.quantity,
                price: product.price,
            });

            totalAmount += product.price * item.quantity;

            // Update stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            customerInfo: {
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone || '',
            },
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'card',
        });

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: [] }
        );

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: {
                order,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Admin: Get all orders
export const getAllOrdersAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.query;

        const filter: any = {};
        if (status) {
            filter.orderStatus = status;
        }

        const orders = await Order.find(filter)
            .populate('user', 'name email')
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: {
                orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }

        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: {
                orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        }).populate('items.product');

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                order,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { orderStatus, paymentStatus },
            { new: true, runValidators: true }
        );

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: {
                order,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }

        if (order.orderStatus !== 'pending') {
            res.status(400).json({
                success: false,
                message: 'Only pending orders can be cancelled',
            });
            return;
        }

        order.orderStatus = 'cancelled';
        await order.save();

        // Restore stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity },
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: {
                order,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
