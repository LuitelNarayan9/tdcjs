/**
 * Resend Email Client
 * Singleton instance for sending emails via Resend API
 */

import { Resend } from 'resend';

// Environment validation
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn('⚠️ RESEND_API_KEY is not set. Email sending will fail.');
}

/**
 * Resend client singleton
 * Used for all email operations in the application
 */
export const resend = new Resend(apiKey);

/**
 * Default sender email address
 * Should be a verified domain in Resend
 */
export const defaultFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

/**
 * Application URLs for email links
 */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
