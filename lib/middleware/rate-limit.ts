/**
 * Rate Limiting Middleware
 * Implements rate limiting for API routes and sensitive endpoints
 * 
 * Next.js 16.1.4 - Middleware utilities
 */

import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for rate limiting
// In production, use Redis or similar distributed store
interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

interface RateLimitConfig {
    // Maximum number of requests allowed within the window
    limit: number;
    // Time window in seconds
    window: number;
    // Custom identifier function (defaults to IP address)
    identifier?: (req: NextRequest) => string;
}

/**
 * Default rate limit configurations
 */
export const RATE_LIMITS = {
    // Strict limits for authentication endpoints
    AUTH: {
        limit: 5,
        window: 60, // 5 requests per minute
    },
    // Standard limits for API routes
    API: {
        limit: 60,
        window: 60, // 60 requests per minute
    },
    // Generous limits for authenticated users
    AUTHENTICATED: {
        limit: 120,
        window: 60, // 120 requests per minute
    },
    // Strict limits for admin endpoints
    ADMIN: {
        limit: 300,
        window: 60, // 300 requests per minute
    },
} as const;

/**
 * Get client IP address from request
 */
function getClientIp(req: NextRequest): string {
    // Check for forwarded IP (behind proxy)
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    
    // Check for real IP
    const realIp = req.headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }
    
    // Fallback to a default (in production, use proper IP detection)
    return 'unknown';
}

/**
 * Create a rate limit key from request
 */
function createKey(req: NextRequest, identifier?: string): string {
    const path = req.nextUrl.pathname;
    const id = identifier || getClientIp(req);
    return `${path}:${id}`;
}

/**
 * Clean up expired entries from store
 */
function cleanupStore(): void {
    const now = Date.now();
    for (const key in store) {
        if (store[key].resetTime < now) {
            delete store[key];
        }
    }
}

// Run cleanup every minute
if (typeof window === 'undefined') {
    setInterval(cleanupStore, 60000);
}

/**
 * Rate limiting result
 */
interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}

/**
 * Check rate limit for a request
 */
export function checkRateLimit(
    req: NextRequest,
    config: RateLimitConfig
): RateLimitResult {
    const key = createKey(req, config.identifier?.(req));
    const now = Date.now();
    const windowMs = config.window * 1000;
    
    const entry = store[key];
    
    // If no entry or window has expired, create new entry
    if (!entry || entry.resetTime < now) {
        store[key] = {
            count: 1,
            resetTime: now + windowMs,
        };
        
        return {
            allowed: true,
            limit: config.limit,
            remaining: config.limit - 1,
            resetTime: now + windowMs,
        };
    }
    
    // Check if limit exceeded
    if (entry.count >= config.limit) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        
        return {
            allowed: false,
            limit: config.limit,
            remaining: 0,
            resetTime: entry.resetTime,
            retryAfter,
        };
    }
    
    // Increment count
    entry.count++;
    
    return {
        allowed: true,
        limit: config.limit,
        remaining: config.limit - entry.count,
        resetTime: entry.resetTime,
    };
}

/**
 * Apply rate limiting to a request and return response if limited
 */
export function applyRateLimit(
    req: NextRequest,
    config: RateLimitConfig
): NextResponse | null {
    const result = checkRateLimit(req, config);
    
    if (!result.allowed) {
        const response = NextResponse.json(
            {
                error: 'Too many requests',
                message: `Rate limit exceeded. Try again in ${result.retryAfter} seconds.`,
                retryAfter: result.retryAfter,
            },
            { status: 429 }
        );
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', result.limit.toString());
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
        response.headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());
        response.headers.set('Retry-After', result.retryAfter?.toString() || '60');
        
        return response;
    }
    
    return null;
}

/**
 * Middleware wrapper for rate limiting
 * Usage in API routes:
 * 
 * export async function POST(req: NextRequest) {
 *   const rateLimitResponse = withRateLimit(req, RATE_LIMITS.AUTH);
 *   if (rateLimitResponse) return rateLimitResponse;
 *   
 *   // Your route logic here
 * }
 */
export function withRateLimit(
    req: NextRequest,
    config: RateLimitConfig
): NextResponse | null {
    return applyRateLimit(req, config);
}

/**
 * Create a rate-limited API handler
 * Higher-order function to wrap API route handlers
 */
export function createRateLimitedHandler<
    T extends (req: NextRequest) => Promise<NextResponse>
>(handler: T, config: RateLimitConfig) {
    return async function (req: NextRequest): Promise<NextResponse> {
        const rateLimitResponse = applyRateLimit(req, config);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }
        
        return handler(req);
    };
}
