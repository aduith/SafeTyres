import express from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    getAllOrdersAdmin,
} from '../controllers/orderController';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { orderValidation } from '../validators/validators';

const router = express.Router();

// Admin routes (must be before other routes to avoid conflicts)
router.get('/all', authenticate, authorizeAdmin, getAllOrdersAdmin);
router.put('/:id', authenticate, authorizeAdmin, updateOrderStatus);

// Protected routes
router.post('/', authenticate, orderValidation, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);
router.delete('/:id', authenticate, cancelOrder);

export default router;
