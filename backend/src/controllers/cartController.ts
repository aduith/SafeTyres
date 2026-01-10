import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const sessionId = req.headers['x-session-id'] as string;

        const filter: any = userId ? { user: userId } : { sessionId };

        let cart = await Cart.findOne(filter).populate('items.product');

        if (!cart) {
            cart = await Cart.create(filter);
        }

        res.status(200).json({
            success: true,
            data: {
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user?._id;
        const sessionId = req.headers['x-session-id'] as string;

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        const filter: any = userId ? { user: userId } : { sessionId };

        let cart = await Cart.findOne(filter);

        if (!cart) {
            cart = await Cart.create({
                ...filter,
                items: [{ product: productId, quantity }],
            });
        } else {
            // Check if product already in cart
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity } as any);
            }

            await cart.save();
        }

        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Product added to cart',
            data: {
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const userId = req.user?._id;
        const sessionId = req.headers['x-session-id'] as string;

        const filter: any = userId ? { user: userId } : { sessionId };

        const cart = await Cart.findOne(filter);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
            return;
        }

        const item = cart.items.find((item) => item._id?.toString() === itemId);

        if (!item) {
            res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
            return;
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter((item) => item._id?.toString() !== itemId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            data: {
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cart',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { itemId } = req.params;
        const userId = req.user?._id;
        const sessionId = req.headers['x-session-id'] as string;

        const filter: any = userId ? { user: userId } : { sessionId };

        const cart = await Cart.findOne(filter);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
            return;
        }

        cart.items = cart.items.filter((item) => item._id?.toString() !== itemId);

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: {
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing from cart',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const sessionId = req.headers['x-session-id'] as string;

        const filter: any = userId ? { user: userId } : { sessionId };

        const cart = await Cart.findOne(filter);

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
            return;
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            data: {
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
