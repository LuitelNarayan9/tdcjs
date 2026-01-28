'use server';

/**
 * Email Verification Server Action
 * Handles email verification and sends welcome email
 * 
 * Next.js 16.1.4 Server Action
 */

import { prisma } from '@/lib/db';
import { verifyToken, createVerificationToken } from '@/lib/auth/tokens';
import { sendWelcomeEmail, sendVerificationEmail } from '@/lib/email';

interface VerifyEmailResult {
  success: boolean;
  message: string;
  redirectTo?: string;
}

/**
 * Verify user email with token
 * 
 * @param token - Verification token from email link
 * @returns Result with success status
 */
export async function verifyEmail(token: string): Promise<VerifyEmailResult> {
  try {
    if (!token) {
      return {
        success: false,
        message: 'Verification token is required',
      };
    }
    
    // Verify token and get email
    const email = await verifyToken(token);
    
    if (!email) {
      return {
        success: false,
        message: 'Invalid or expired verification link. Please request a new one.',
      };
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, name: true, emailVerified: true, status: true },
    });
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    
    // Check if already verified
    if (user.emailVerified) {
      return {
        success: true,
        message: 'Your email is already verified. You can now login.',
        redirectTo: '/login',
      };
    }
    
    // Update user: set emailVerified and status to ACTIVE
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        status: 'ACTIVE',
      },
    });
    
    // Send welcome email
    const emailResult = await sendWelcomeEmail(email, user.name || 'User');
    
    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Don't fail verification if welcome email fails
    }
    
    return {
      success: true,
      message: 'Email verified successfully! You can now login to your account.',
      redirectTo: '/login?verified=true',
    };
  } catch (error) {
    console.error('Email verification error:', error);
    return {
      success: false,
      message: 'An error occurred during verification. Please try again.',
    };
  }
}

/**
 * Resend verification email
 * 
 * @param email - User's email address
 * @returns Result with success status
 */
export async function resendVerificationEmailAction(email: string): Promise<VerifyEmailResult> {
  try {
    if (!email) {
      return {
        success: false,
        message: 'Email is required',
      };
    }
    
    const emailLower = email.toLowerCase();
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: emailLower },
      select: { id: true, name: true, emailVerified: true, status: true },
    });
    
    if (!user) {
      // Generic message to prevent email enumeration
      return {
        success: true,
        message: 'If an account exists with this email, a verification link will be sent.',
      };
    }
    
    // Check if already verified
    if (user.emailVerified) {
      return {
        success: false,
        message: 'This email is already verified. You can login directly.',
      };
    }
    
    // Create new verification token
    const { token } = await createVerificationToken(emailLower, 'EMAIL_VERIFICATION');
    
    // Send verification email
    const emailResult = await sendVerificationEmail(emailLower, user.name || 'User', token);
    
    if (!emailResult.success) {
      return {
        success: false,
        message: 'Failed to send verification email. Please try again later.',
      };
    }
    
    return {
      success: true,
      message: 'Verification email sent! Please check your inbox.',
    };
  } catch (error) {
    console.error('Resend verification error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}
