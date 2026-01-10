import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_SECRET || 'default_secret_key';
    const expiresIn = (process.env.JWT_EXPIRE || '7d') as any;

    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET || 'default_secret_key';

    try {
        return jwt.verify(token, secret) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
