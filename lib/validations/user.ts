/**
 * User validation schemas
 * Schemas for user profiles, settings, and preferences
 */

import { z } from 'zod';
import {
  emailSchema,
  usernameSchema,
  displayNameSchema,
  phoneSchema,
  urlSchema,
  bioSchema,
  idSchema,
} from './common';

// ==============================================
// PROFILE SCHEMAS
// ==============================================

/**
 * Update user profile
 */
export const updateProfileSchema = z.object({
  name: displayNameSchema.optional(),
  username: usernameSchema.optional(),
  bio: bioSchema,
  phone: phoneSchema,
  website: urlSchema,
  location: z.string().max(100).optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
});

/**
 * Update avatar/profile picture
 */
export const updateAvatarSchema = z.object({
  imageUrl: z.string().url('Please provide a valid image URL'),
});

/**
 * Update email (requires verification)
 */
export const updateEmailSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required to change email'),
});

// ==============================================
// PREFERENCES SCHEMAS
// ==============================================

/**
 * User notification preferences
 */
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  
  // Specific notification types
  newFollower: z.boolean().default(true),
  newComment: z.boolean().default(true),
  newReply: z.boolean().default(true),
  newMessage: z.boolean().default(true),
  newMention: z.boolean().default(true),
  weeklyDigest: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

/**
 * User privacy preferences
 */
export const privacyPreferencesSchema = z.object({
  profileVisibility: z.enum(['PUBLIC', 'MEMBERS_ONLY', 'PRIVATE']).default('PUBLIC'),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  showBirthday: z.boolean().default(false),
  showLocation: z.boolean().default(true),
  allowMessages: z.enum(['EVERYONE', 'FOLLOWING', 'NOBODY']).default('EVERYONE'),
  showOnlineStatus: z.boolean().default(true),
  showActivityStatus: z.boolean().default(true),
});

/**
 * User display preferences
 */
export const displayPreferencesSchema = z.object({
  theme: z.enum(['LIGHT', 'DARK', 'SYSTEM']).default('SYSTEM'),
  language: z.enum(['en', 'ne']).default('en'),
  timezone: z.string().default('Asia/Kathmandu'),
  dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).default('MM/DD/YYYY'),
  timeFormat: z.enum(['12h', '24h']).default('12h'),
});

/**
 * Combined user preferences
 */
export const userPreferencesSchema = z.object({
  notifications: notificationPreferencesSchema.optional(),
  privacy: privacyPreferencesSchema.optional(),
  display: displayPreferencesSchema.optional(),
});

// ==============================================
// ACCOUNT MANAGEMENT
// ==============================================

/**
 * Deactivate account
 */
export const deactivateAccountSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  reason: z.string().max(500).optional(),
  feedback: z.string().max(1000).optional(),
});

/**
 * Delete account
 */
export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirmation: z.literal('DELETE MY ACCOUNT', {
    message: 'Please type "DELETE MY ACCOUNT" to confirm',
  }),
  reason: z.string().max(500).optional(),
});

/**
 * Export user data
 */
export const exportDataSchema = z.object({
  format: z.enum(['JSON', 'CSV']).default('JSON'),
  includeMedia: z.boolean().default(false),
});

// ==============================================
// SOCIAL/CONNECTIONS
// ==============================================

/**
 * Follow/unfollow user
 */
export const followUserSchema = z.object({
  userId: idSchema,
});

/**
 * Block user
 */
export const blockUserSchema = z.object({
  userId: idSchema,
  reason: z.string().max(500).optional(),
});

/**
 * Report user
 */
export const reportUserSchema = z.object({
  userId: idSchema,
  reason: z.enum([
    'SPAM',
    'HARASSMENT',
    'INAPPROPRIATE_CONTENT',
    'IMPERSONATION',
    'MISINFORMATION',
    'OTHER',
  ]),
  description: z.string().min(10, 'Please provide more details').max(1000),
  evidence: z.array(z.string().url()).max(5).optional(),
});

// ==============================================
// TYPE EXPORTS
// ==============================================

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateAvatarInput = z.infer<typeof updateAvatarSchema>;
export type UpdateEmailInput = z.infer<typeof updateEmailSchema>;
export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>;
export type PrivacyPreferences = z.infer<typeof privacyPreferencesSchema>;
export type DisplayPreferences = z.infer<typeof displayPreferencesSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type DeactivateAccountInput = z.infer<typeof deactivateAccountSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type FollowUserInput = z.infer<typeof followUserSchema>;
export type BlockUserInput = z.infer<typeof blockUserSchema>;
export type ReportUserInput = z.infer<typeof reportUserSchema>;
