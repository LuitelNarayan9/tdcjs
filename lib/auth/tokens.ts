/**
 * Token utilities
 * Generate and verify tokens for email verification, password reset, etc.
 */

import crypto from 'crypto';
import { prisma } from '@/lib/db';

/**
 * Token expiration times (in milliseconds)
 */
export const TOKEN_EXPIRY = {
  EMAIL_VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET: 60 * 60 * 1000, // 1 hour
  TWO_FACTOR: 10 * 60 * 1000, // 10 minutes
  INVITE: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

/**
 * Token types
 */
export type TokenType = keyof typeof TOKEN_EXPIRY;

/**
 * Generate a secure random token
 * 
 * @param length - Token length in bytes (default: 32)
 * @returns Hex-encoded token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a 6-digit verification code
 * 
 * @returns 6-digit code as string
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create a verification token for a user
 * 
 * @param email - User's email
 * @param type - Token type (determines expiry)
 * @returns Token object with token and expiry
 */
export async function createVerificationToken(
  email: string,
  type: TokenType = 'EMAIL_VERIFICATION'
): Promise<{ token: string; expires: Date }> {
  const token = generateToken();
  const expires = new Date(Date.now() + TOKEN_EXPIRY[type]);
  
  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });
  
  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
  
  return { token, expires };
}

/**
 * Verify a token and return the associated email
 * 
 * @param token - Token to verify
 * @returns Email if valid, null if invalid or expired
 */
export async function verifyToken(token: string): Promise<string | null> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
      expires: { gt: new Date() },
    },
  });
  
  if (!verificationToken) {
    return null;
  }
  
  // Delete the used token
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    },
  });
  
  return verificationToken.identifier;
}

/**
 * Create a password reset token
 * 
 * @param email - User's email
 * @returns Token and expiry
 */
export async function createPasswordResetToken(
  email: string
): Promise<{ token: string; expires: Date } | null> {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  
  if (!user) {
    return null;
  }
  
  return createVerificationToken(email, 'PASSWORD_RESET');
}

/**
 * Create a two-factor authentication token
 * 
 * @param email - User's email
 * @returns 6-digit code and expiry
 */
export async function createTwoFactorToken(
  email: string
): Promise<{ code: string; expires: Date }> {
  const code = generateVerificationCode();
  const expires = new Date(Date.now() + TOKEN_EXPIRY.TWO_FACTOR);
  
  // Delete any existing 2FA tokens
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: `2fa:${email}`,
    },
  });
  
  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: `2fa:${email}`,
      token: code,
      expires,
    },
  });
  
  return { code, expires };
}

/**
 * Verify a two-factor authentication code
 * 
 * @param email - User's email
 * @param code - 6-digit code
 * @returns True if valid
 */
export async function verifyTwoFactorCode(
  email: string,
  code: string
): Promise<boolean> {
  const identifier = await verifyToken(code);
  return identifier === `2fa:${email}`;
}

/**
 * Create an invite token
 * 
 * @param email - Invitee's email
 * @param invitedBy - ID of user sending invite
 * @returns Token and expiry
 */
export async function createInviteToken(
  email: string,
  invitedBy: string
): Promise<{ token: string; expires: Date }> {
  const token = generateToken();
  const expires = new Date(Date.now() + TOKEN_EXPIRY.INVITE);
  
  await prisma.verificationToken.create({
    data: {
      identifier: `invite:${email}:${invitedBy}`,
      token,
      expires,
    },
  });
  
  return { token, expires };
}

/**
 * Verify an invite token
 * 
 * @param token - Invite token
 * @returns Invite details or null
 */
export async function verifyInviteToken(
  token: string
): Promise<{ email: string; invitedBy: string } | null> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
      identifier: { startsWith: 'invite:' },
      expires: { gt: new Date() },
    },
  });
  
  if (!verificationToken) {
    return null;
  }
  
  // Parse identifier: invite:email:invitedBy
  const parts = verificationToken.identifier.split(':');
  if (parts.length !== 3) {
    return null;
  }
  
  // Delete the used token
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    },
  });
  
  return {
    email: parts[1],
    invitedBy: parts[2],
  };
}

/**
 * Clean up expired tokens
 * Run this periodically (e.g., via cron job)
 */
export async function cleanupExpiredTokens(): Promise<number> {
  const result = await prisma.verificationToken.deleteMany({
    where: {
      expires: { lt: new Date() },
    },
  });
  
  return result.count;
}
