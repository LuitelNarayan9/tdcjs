'use server';

/**
 * Login Server Action with Clerk
 * Handles custom UI login using Clerk backend
 * 
 * Next.js 16.1.4 Server Action
 */

import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { loginSchema } from '@/lib/validations/auth';
import type { z } from 'zod';

type LoginInput = z.infer<typeof loginSchema>;

interface LoginResult {
  success: boolean;
  message: string;
  signInToken?: string;
  redirectTo?: string;
  requiresVerification?: boolean;
}

/**
 * Validate user credentials with Clerk
 * Note: Actual sign-in happens client-side with Clerk's signIn
 * This action validates and checks user status before sign-in
 * 
 * @param data - Login form data
 * @returns Result with success status
 */
export async function validateLogin(data: LoginInput): Promise<LoginResult> {
  try {
    // Validate input
    const parsed = loginSchema.safeParse(data);
    
    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    
    const { email } = parsed.data;
    const emailLower = email.toLowerCase();
    
    const clerk = await clerkClient();
    
    // Find user in Clerk
    const clerkUsers = await clerk.users.getUserList({
      emailAddress: [emailLower],
    });
    
    if (clerkUsers.data.length === 0) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    
    const clerkUser = clerkUsers.data[0];
    
    // Check user status in our database
    const dbUser = await prisma.user.findUnique({
      where: { id: clerkUser.id },
      select: { status: true, emailVerified: true },
    });
    
    if (dbUser) {
      // Block PENDING users (not verified)
      if (dbUser.status === 'PENDING') {
        return {
          success: false,
          message: 'Please verify your email before logging in. Check your inbox for the verification link.',
          requiresVerification: true,
        };
      }
      
      // Block BANNED users
      if (dbUser.status === 'BANNED') {
        return {
          success: false,
          message: 'Your account has been banned. Please contact support for assistance.',
        };
      }
      
      // Block SUSPENDED users
      if (dbUser.status === 'SUSPENDED') {
        return {
          success: false,
          message: 'Your account has been temporarily suspended. Please contact support.',
        };
      }
    }
    
    // User is valid - client-side will complete sign-in with Clerk
    return {
      success: true,
      message: 'Credentials valid',
    };
  } catch (error) {
    console.error('Login validation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
