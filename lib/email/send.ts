/**
 * Email Sending Functions
 * Wrapper functions for sending various types of emails via Resend
 */

import { resend, defaultFrom, appUrl } from './client';
import { VerifyEmailTemplate } from './templates/verify-email';
import { WelcomeEmailTemplate } from './templates/welcome';
import { ResetPasswordEmailTemplate } from './templates/reset-password';

/**
 * Email send result
 */
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send verification email to new user
 * 
 * @param to - Recipient email
 * @param name - User's display name
 * @param token - Verification token
 */
export async function sendVerificationEmail(
  to: string,
  name: string,
  token: string
): Promise<EmailResult> {
  try {
    const verificationUrl = `${appUrl}/en/verify-email?token=${token}`;
    
    const { data, error } = await resend.emails.send({
      from: defaultFrom,
      to,
      subject: 'Verify your email - TDCJS',
      react: VerifyEmailTemplate({ name, verificationUrl }),
    });
    
    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send welcome email after verification
 * 
 * @param to - Recipient email
 * @param name - User's display name
 */
export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<EmailResult> {
  try {
    const loginUrl = `${appUrl}/en/login`;
    
    const { data, error } = await resend.emails.send({
      from: defaultFrom,
      to,
      subject: 'Welcome to TDCJS!',
      react: WelcomeEmailTemplate({ name, loginUrl }),
    });
    
    if (error) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send password reset email
 * 
 * @param to - Recipient email
 * @param name - User's display name
 * @param token - Reset token
 */
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  token: string
): Promise<EmailResult> {
  try {
    const resetUrl = `${appUrl}/en/reset-password?token=${token}`;
    
    const { data, error } = await resend.emails.send({
      from: defaultFrom,
      to,
      subject: 'Reset your password - TDCJS',
      react: ResetPasswordEmailTemplate({ name, resetUrl }),
    });
    
    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Resend verification email
 * Used when user requests a new verification email
 * 
 * @param to - Recipient email
 * @param name - User's display name
 * @param token - New verification token
 */
export async function resendVerificationEmail(
  to: string,
  name: string,
  token: string
): Promise<EmailResult> {
  return sendVerificationEmail(to, name, token);
}
