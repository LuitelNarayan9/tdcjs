/**
 * Password utilities
 * Hashing and verification using bcryptjs
 */

import bcrypt from 'bcryptjs';

/**
 * Number of salt rounds for bcrypt
 * Higher = more secure but slower
 * 12 is a good balance for modern hardware
 */
const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 * 
 * @param password - Plain text password
 * @returns Hashed password
 * 
 * @example
 * const hash = await hashPassword('myPassword123');
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 * 
 * @param password - Plain text password to verify
 * @param hashedPassword - Stored hashed password
 * @returns True if password matches
 * 
 * @example
 * const isValid = await verifyPassword('myPassword123', storedHash);
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';

/**
 * Password strength result
 */
export interface PasswordStrengthResult {
  score: number;
  strength: PasswordStrength;
  feedback: string[];
  isValid: boolean;
}

/**
 * Check password strength
 * 
 * @param password - Password to check
 * @returns Strength result with score and feedback
 * 
 * @example
 * const result = checkPasswordStrength('MyP@ssw0rd!');
 * // { score: 4, strength: 'strong', feedback: [], isValid: true }
 */
export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const feedback: string[] = [];
  let score = 0;
  
  // Length checks
  if (password.length >= 8) score++;
  else feedback.push('Password must be at least 8 characters');
  
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  
  // Character type checks
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add uppercase letters');
  
  if (/[0-9]/.test(password)) score++;
  else feedback.push('Add numbers');
  
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push('Add special characters');
  
  // Common patterns to avoid
  const commonPatterns = [
    /^123/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /(.)\1{2,}/, // Repeated characters
  ];
  
  const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));
  if (hasCommonPattern) {
    score = Math.max(0, score - 2);
    feedback.push('Avoid common patterns');
  }
  
  // Calculate strength level
  let strength: PasswordStrength;
  if (score <= 2) strength = 'weak';
  else if (score <= 3) strength = 'fair';
  else if (score <= 4) strength = 'good';
  else if (score <= 5) strength = 'strong';
  else strength = 'very-strong';
  
  // Minimum requirements for validity
  const isValid = 
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);
  
  return {
    score,
    strength,
    feedback,
    isValid,
  };
}

/**
 * Generate a random password
 * 
 * @param length - Password length (default: 16)
 * @returns Random password
 */
export function generateRandomPassword(length: number = 16): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  
  // Ensure at least one of each type
  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
