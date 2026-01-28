/**
 * Authentication validation schemas
 * Schemas for login, register, password reset, etc.
 */

import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  simplePasswordSchema,
  usernameSchema,
  displayNameSchema,
} from './common';

// ==============================================
// LOGIN SCHEMAS
// ==============================================

/**
 * Login with email and password
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: simplePasswordSchema,
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Login with username and password
 */
export const loginWithUsernameSchema = z.object({
  username: usernameSchema,
  password: simplePasswordSchema,
  rememberMe: z.boolean().optional().default(false),
});

// ==============================================
// REGISTRATION SCHEMAS
// ==============================================

/**
 * User registration
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    name: displayNameSchema,
    username: usernameSchema.optional(),
    acceptTerms: z.literal(true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Registration with invite code
 */
export const registerWithInviteSchema = registerSchema.extend({
  inviteCode: z.string().min(1, 'Invite code is required'),
});

// ==============================================
// PASSWORD SCHEMAS
// ==============================================

/**
 * Forgot password request
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Reset password with token
 */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Change password (when logged in)
 */
export const changePasswordSchema = z
  .object({
    currentPassword: simplePasswordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

// ==============================================
// EMAIL VERIFICATION
// ==============================================

/**
 * Email verification token
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

/**
 * Resend verification email
 */
export const resendVerificationSchema = z.object({
  email: emailSchema,
});

// ==============================================
// TWO-FACTOR AUTHENTICATION
// ==============================================

/**
 * 2FA verification code
 */
export const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'Code must be 6 digits')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only numbers'),
});

/**
 * 2FA setup confirmation
 */
export const twoFactorSetupSchema = z.object({
  secret: z.string().min(1),
  code: twoFactorSchema.shape.code,
});

/**
 * 2FA recovery code
 */
export const twoFactorRecoverySchema = z.object({
  recoveryCode: z.string().min(1, 'Recovery code is required'),
});

// ==============================================
// TYPE EXPORTS
// ==============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginWithUsernameInput = z.infer<typeof loginWithUsernameSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterWithInviteInput = z.infer<typeof registerWithInviteSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type TwoFactorInput = z.infer<typeof twoFactorSchema>;
export type TwoFactorSetupInput = z.infer<typeof twoFactorSetupSchema>;
