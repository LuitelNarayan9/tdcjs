/**
 * Common validation schemas
 * Shared schemas used across the application
 */

import { z } from 'zod';
import { PATTERNS, CONTENT_LIMITS, PAGINATION } from '@/lib/utils/constants';

// ==============================================
// PRIMITIVE SCHEMAS
// ==============================================

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

/**
 * Password validation with strength requirements
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

/**
 * Simple password (less strict, for login)
 */
export const simplePasswordSchema = z
  .string()
  .min(1, 'Password is required')
  .max(100, 'Password is too long');

/**
 * Username validation
 */
export const usernameSchema = z
  .string()
  .min(CONTENT_LIMITS.USERNAME_MIN, `Username must be at least ${CONTENT_LIMITS.USERNAME_MIN} characters`)
  .max(CONTENT_LIMITS.USERNAME_MAX, `Username must be at most ${CONTENT_LIMITS.USERNAME_MAX} characters`)
  .regex(PATTERNS.USERNAME, 'Username can only contain letters, numbers, and underscores')
  .toLowerCase()
  .trim();

/**
 * Display name validation
 */
export const displayNameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(CONTENT_LIMITS.DISPLAY_NAME_MAX, `Name must be at most ${CONTENT_LIMITS.DISPLAY_NAME_MAX} characters`)
  .trim();

/**
 * Phone number validation
 */
export const phoneSchema = z
  .string()
  .regex(PATTERNS.PHONE, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''));

/**
 * URL validation
 */
export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

/**
 * Slug validation
 */
export const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(200, 'Slug is too long')
  .regex(PATTERNS.SLUG, 'Slug can only contain lowercase letters, numbers, and hyphens');

/**
 * CUID validation (for IDs)
 */
export const cuidSchema = z.string().cuid();

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid();

/**
 * ID schema (accepts cuid or uuid)
 */
export const idSchema = z.string().min(1, 'ID is required');

// ==============================================
// PAGINATION SCHEMAS
// ==============================================

/**
 * Pagination query schema
 */
export const paginationSchema = z.object({
  page: z
    .number()
    .int()
    .min(1)
    .default(PAGINATION.DEFAULT_PAGE)
    .or(z.string().transform((v) => parseInt(v, 10) || PAGINATION.DEFAULT_PAGE)),
  limit: z
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_PAGE_SIZE)
    .default(PAGINATION.DEFAULT_PAGE_SIZE)
    .or(z.string().transform((v) => Math.min(parseInt(v, 10) || PAGINATION.DEFAULT_PAGE_SIZE, PAGINATION.MAX_PAGE_SIZE))),
});

/**
 * Search query schema
 */
export const searchQuerySchema = z.object({
  q: z.string().max(200).optional(),
  ...paginationSchema.shape,
});

/**
 * Sort schema
 */
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ==============================================
// DATE SCHEMAS
// ==============================================

/**
 * Date string schema (ISO format)
 */
export const dateStringSchema = z
  .string()
  .datetime()
  .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/));

/**
 * Date range schema
 */
export const dateRangeSchema = z.object({
  from: dateStringSchema.optional(),
  to: dateStringSchema.optional(),
}).refine(
  (data) => {
    if (data.from && data.to) {
      return new Date(data.from) <= new Date(data.to);
    }
    return true;
  },
  { message: 'Start date must be before end date' }
);

// ==============================================
// FILE SCHEMAS
// ==============================================

/**
 * File upload schema
 */
export const fileUploadSchema = z.object({
  name: z.string().min(1),
  size: z.number().positive(),
  type: z.string().min(1),
  url: z.string().url().optional(),
});

/**
 * Image upload schema
 */
export const imageUploadSchema = fileUploadSchema.extend({
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  alt: z.string().max(200).optional(),
});

// ==============================================
// CONTENT SCHEMAS
// ==============================================

/**
 * Rich text content schema
 */
export const richTextSchema = z
  .string()
  .min(1, 'Content is required')
  .max(100000, 'Content is too long');

/**
 * Bio/description schema
 */
export const bioSchema = z
  .string()
  .max(CONTENT_LIMITS.BIO_MAX, `Bio must be at most ${CONTENT_LIMITS.BIO_MAX} characters`)
  .optional()
  .or(z.literal(''));

/**
 * Tags schema
 */
export const tagsSchema = z
  .array(z.string().min(1).max(50))
  .max(10, 'Maximum 10 tags allowed')
  .optional();

// ==============================================
// TYPE EXPORTS
// ==============================================

export type Email = z.infer<typeof emailSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type Username = z.infer<typeof usernameSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type SortQuery = z.infer<typeof sortSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;
export type ImageUpload = z.infer<typeof imageUploadSchema>;
