import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
    const env_uri = process.env.MONGODB_URI || 'NOT_FOUND';
    const maskedUri = env_uri.replace(/:([^@]+)@/, ':****@').split('?')[0];

    // Initial response structure
    const diagnostics: any = {
        success: false,
        env_metadata: {
            uri_exists: env_uri !== 'NOT_FOUND',
            masked_uri: maskedUri,
            api_url: process.env.NEXT_PUBLIC_API_URL || 'relative (empty)',
        },
        connection: {
            status: 'initiating',
            database: 'unknown',
        }
    };

    try {
        await connectDB();

        const dbStatus = mongoose.connection.readyState;
        const statusMap = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };

        diagnostics.success = true;
        diagnostics.connection = {
            status: statusMap[dbStatus as keyof typeof statusMap] || 'unknown',
            database: mongoose.connection.name,
            host: mongoose.connection.host,
        };

        return NextResponse.json(diagnostics);
    } catch (error: any) {
        diagnostics.error = error?.message || 'Unknown error';
        return NextResponse.json(diagnostics, { status: 500 });
    }
}
