import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

export const loginValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

export const productValidation: ValidationChain[] = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('size')
        .notEmpty()
        .withMessage('Size is required')
        .isIn(['200ml', '300ml', '500ml', '1L'])
        .withMessage('Invalid size'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('image').notEmpty().withMessage('Product image is required'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
];

export const orderValidation: ValidationChain[] = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),
    body('shippingAddress.street')
        .trim()
        .notEmpty()
        .withMessage('Street address is required'),
    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required'),
    body('shippingAddress.state')
        .trim()
        .notEmpty()
        .withMessage('State is required'),
    body('shippingAddress.zipCode')
        .trim()
        .notEmpty()
        .withMessage('Zip code is required'),
    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required'),
];
