/**
 * Email Module Barrel Export
 * Re-exports all email-related utilities
 */

// Client
export { resend, defaultFrom, appUrl } from './client';

// Send functions
export {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  resendVerificationEmail,
} from './send';

// Templates (for testing/preview purposes)
export { VerifyEmailTemplate } from './templates/verify-email';
export { WelcomeEmailTemplate } from './templates/welcome';
export { ResetPasswordEmailTemplate } from './templates/reset-password';
