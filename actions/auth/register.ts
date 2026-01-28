'use server';

/**
 * Registration Server Action with Clerk
 * Handles custom UI registration using Clerk backend
 * 
 * Next.js 16.1.4 Server Action
 */

import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { registerSchema } from '@/lib/validations/auth';
import type { z } from 'zod';

type RegisterInput = z.infer<typeof registerSchema>;

interface RegisterResult {
  success: boolean;
  message: string;
  userId?: string;
  requiresVerification?: boolean;
}

/**
 * Register a new user with Clerk
 * 
 * @param data - Registration form data
 * @returns Result with success status and message
 */
export async function register(data: RegisterInput): Promise<RegisterResult> {
  try {
    // Validate input
    const parsed = registerSchema.safeParse(data);
    
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input data';
      return {
        success: false,
        message: firstError,
      };
    }
    
    const { email, password, name, username } = parsed.data;
    const emailLower = email.toLowerCase();
    const usernameLower = username?.toLowerCase() || undefined;
    
    // Check if username is taken in our database
    if (usernameLower) {
      const existingUser = await prisma.user.findUnique({
        where: { username: usernameLower },
        select: { id: true },
      });
      
      if (existingUser) {
        return {
          success: false,
          message: 'This username is already taken. Please choose another.',
        };
      }
    }
    
    const clerk = await clerkClient();
    
    // Create user in Clerk
    const clerkUser = await clerk.users.createUser({
      emailAddress: [emailLower],
      password,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || undefined,
      username: usernameLower,
      publicMetadata: {
        role: 'USER',
        status: 'PENDING',
      },
    });
    
    // Create user in our database (synced with Clerk ID)
    await prisma.user.create({
      data: {
        id: clerkUser.id,
        email: emailLower,
        password: '', // Clerk handles password
        name,
        username: usernameLower,
        role: 'USER',
        status: 'PENDING',
      },
    });
    
    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      userId: clerkUser.id,
      requiresVerification: true,
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Clerk-specific errors
    if (error instanceof Error) {
      if (error.message.includes('email_address')) {
        return {
          success: false,
          message: 'An account with this email already exists.',
        };
      }
      if (error.message.includes('username')) {
        return {
          success: false,
          message: 'This username is already taken.',
        };
      }
    }
    
    return {
      success: false,
      message: 'An error occurred during registration. Please try again.',
    };
  }
}

/**
 * Check if email is available for registration
 */
export async function checkEmailAvailability(email: string): Promise<{ available: boolean; message?: string }> {
  try {
    const clerk = await clerkClient();
    const users = await clerk.users.getUserList({
      emailAddress: [email.toLowerCase()],
    });
    
    if (users.data.length > 0) {
      return { available: false, message: 'This email is already registered.' };
    }
    
    return { available: true };
  } catch {
    return { available: true }; // Assume available on error
  }
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    select: { id: true },
  });
  return !user;
}
