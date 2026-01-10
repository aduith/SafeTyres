import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { popular, size } = req.query;

        // Build filter
        const filter: any = {};
        if (popular === 'true') {
            filter.popular = true;
        }
        if (size) {
            filter.size = size;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: {
                products,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
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

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
