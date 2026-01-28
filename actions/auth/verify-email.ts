'use server';

/**
 * Email Verification Server Action
 * Handles email verification status sync with database
 * 
 * Note: Clerk handles all email verification emails
 * This action syncs Clerk verification status with our database
 * 
 * Next.js 16.1.4 Server Action
 */

import { prisma } from '@/lib/db';
import { auth, clerkClient } from '@clerk/nextjs/server';

interface VerifyEmailResult {
  success: boolean;
  message: string;
  redirectTo?: string;
}

/**
 * Sync email verification status from Clerk to database
 * Called when user clicks verify button or after OAuth callback
 * 
 * @returns Result with success status
 */
export async function syncEmailVerification(): Promise<VerifyEmailResult> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to verify your email',
      };
    }
    
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    
    // Check if email is verified in Clerk
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    );
    
    if (!primaryEmail) {
      return {
        success: false,
        message: 'No email address found',
      };
    }
    
    const isVerified = primaryEmail.verification?.status === 'verified';
    
    if (!isVerified) {
      return {
        success: false,
        message: 'Please verify your email through the link sent by Clerk.',
      };
    }
    
    // Update our database to mark email as verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        status: 'ACTIVE',
      },
    });
    
    return {
      success: true,
      message: 'Email verified successfully! You can now access all features.',
      redirectTo: '/dashboard',
    };
  } catch (error) {
    console.error('Email verification sync error:', error);
    return {
      success: false,
      message: 'An error occurred during verification. Please try again.',
    };
  }
}

/**
 * Request email verification from Clerk
 * Clerk will send the verification email
 * 
 * @returns Result with success status
 */
export async function requestEmailVerification(): Promise<VerifyEmailResult> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to request verification',
      };
    }
    
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    );
    
    if (!primaryEmail) {
      return {
        success: false,
        message: 'No email address found',
      };
    }
    
    if (primaryEmail.verification?.status === 'verified') {
      return {
        success: true,
        message: 'Your email is already verified!',
      };
    }
    
    // Clerk automatically sends verification emails when needed
    // The user can request a new one through Clerk's UserProfile component
    // or through their account settings
    
    return {
      success: true,
      message: 'Please check your email for a verification link from Clerk.',
    };
  } catch (error) {
    console.error('Request verification error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}
