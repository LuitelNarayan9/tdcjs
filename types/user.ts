/**
 * User types
 * Types for user profiles, preferences, and related data
 */

// ==============================================
// USER PROFILE TYPES
// ==============================================

/**
 * Public user profile (visible to others)
 */
export interface PublicUserProfile {
  id: string;
  username: string | null;
  name: string | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  
  // Stats
  followersCount: number;
  followingCount: number;
  postsCount: number;
  
  // Relationship to current user
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  isBlocked?: boolean;
}

/**
 * Private user profile (visible only to the user)
 */
export interface PrivateUserProfile extends PublicUserProfile {
  email: string;
  emailVerified: Date | null;
  phone: string | null;
  dateOfBirth: Date | null;
  gender: Gender | null;
  role: import('./auth').UserRole;
  status: import('./auth').UserStatus;
}

/**
 * User profile with preferences
 */
export interface UserWithPreferences extends PrivateUserProfile {
  preferences: UserPreferences;
}

// ==============================================
// PREFERENCE TYPES
// ==============================================

/**
 * Gender options
 */
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

/**
 * Profile visibility options
 */
export type ProfileVisibility = 'PUBLIC' | 'MEMBERS_ONLY' | 'PRIVATE';

/**
 * Message permission options
 */
export type MessagePermission = 'EVERYONE' | 'FOLLOWING' | 'NOBODY';

/**
 * Theme options
 */
export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM';

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  newFollower: boolean;
  newComment: boolean;
  newReply: boolean;
  newMessage: boolean;
  newMention: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

/**
 * Privacy preferences
 */
export interface PrivacyPreferences {
  profileVisibility: ProfileVisibility;
  showEmail: boolean;
  showPhone: boolean;
  showBirthday: boolean;
  showLocation: boolean;
  allowMessages: MessagePermission;
  showOnlineStatus: boolean;
  showActivityStatus: boolean;
}

/**
 * Display preferences
 */
export interface DisplayPreferences {
  theme: Theme;
  language: 'en' | 'ne';
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

/**
 * Combined user preferences
 */
export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  display: DisplayPreferences;
}

// ==============================================
// ACTIVITY TYPES
// ==============================================

/**
 * User activity types
 */
export type ActivityType =
  | 'LOGIN'
  | 'LOGOUT'
  | 'PROFILE_UPDATE'
  | 'PASSWORD_CHANGE'
  | 'POST_CREATE'
  | 'COMMENT_CREATE'
  | 'FOLLOW'
  | 'UNFOLLOW';

/**
 * User activity log entry
 */
export interface UserActivity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// ==============================================
// RELATIONSHIP TYPES
// ==============================================

/**
 * Follow relationship
 */
export interface FollowRelationship {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

/**
 * Block relationship
 */
export interface BlockRelationship {
  id: string;
  blockerId: string;
  blockedId: string;
  reason?: string;
  createdAt: Date;
}

/**
 * User connection (for suggested users, etc.)
 */
export interface UserConnection {
  user: PublicUserProfile;
  mutualFollowers?: number;
  mutualConnections?: PublicUserProfile[];
}

// ==============================================
// MEMBER PROFILE TYPES
// ==============================================

/**
 * Member types for the Sanstha
 */
export type MembershipType = 'LIFE' | 'ANNUAL' | 'HONORARY' | 'PATRON';

/**
 * Member profile (extends user for Sanstha members)
 */
export interface MemberProfile {
  id: string;
  userId: string;
  membershipType: MembershipType;
  membershipNumber: string;
  memberSince: Date;
  expiresAt?: Date;
  
  // Family info
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  
  // Address
  permanentAddress?: string;
  temporaryAddress?: string;
  
  // Verification
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
}

// ==============================================
// UTILITY TYPES
// ==============================================

/**
 * User list item (for lists/tables)
 */
export interface UserListItem {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: import('./auth').UserRole;
  status: import('./auth').UserStatus;
  createdAt: Date;
  lastLoginAt?: Date;
}

/**
 * User search result
 */
export interface UserSearchResult {
  users: PublicUserProfile[];
  total: number;
  hasMore: boolean;
}
