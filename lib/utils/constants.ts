/**
 * Application constants
 * Centralized configuration values used throughout the application
 */

// ==============================================
// APP INFO
// ==============================================

export const APP_NAME = 'Tumin Dhanbari Chandra Jyoti Sanstha' as const;
export const APP_SHORT_NAME = 'TDCJS' as const;
export const APP_DESCRIPTION =
  'A comprehensive community platform for Tumin Dhanbari village members' as const;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ==============================================
// PAGINATION
// ==============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// ==============================================
// FILE UPLOAD
// ==============================================

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_DOCUMENT_SIZE: 20 * 1024 * 1024, // 20MB

  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],

  ALLOWED_EXTENSIONS: {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    videos: ['.mp4', '.webm', '.ogg'],
    documents: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
  },
} as const;

// ==============================================
// USER ROLES & PERMISSIONS
// ==============================================

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  EDITOR: 'EDITOR',
  MEMBER: 'MEMBER',
  USER: 'USER',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  SUSPENDED: 'SUSPENDED',
  BANNED: 'BANNED',
} as const;

// ==============================================
// CONTENT LIMITS
// ==============================================

export const CONTENT_LIMITS = {
  // User profile
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,
  BIO_MAX: 500,
  DISPLAY_NAME_MAX: 50,

  // Forum
  FORUM_TITLE_MIN: 5,
  FORUM_TITLE_MAX: 200,
  FORUM_CONTENT_MIN: 10,
  FORUM_CONTENT_MAX: 50000,
  FORUM_COMMENT_MAX: 10000,

  // Blog
  BLOG_TITLE_MIN: 5,
  BLOG_TITLE_MAX: 200,
  BLOG_CONTENT_MIN: 100,
  BLOG_CONTENT_MAX: 100000,
  BLOG_EXCERPT_MAX: 500,

  // News
  NEWS_TITLE_MAX: 200,
  NEWS_CONTENT_MAX: 50000,

  // Messages
  MESSAGE_MAX: 5000,
  SUBJECT_MAX: 200,
} as const;

// ==============================================
// CACHE DURATIONS (in seconds)
// ==============================================

export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
} as const;

// ==============================================
// DATE & TIME
// ==============================================

export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  MEDIUM: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  FULL: 'EEEE, MMMM d, yyyy',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

export const TIME_FORMATS = {
  SHORT: 'h:mm a',
  MEDIUM: 'h:mm:ss a',
  LONG: 'h:mm:ss a zzz',
  H24: 'HH:mm',
} as const;

// ==============================================
// LOCALES
// ==============================================

export const LOCALES = {
  DEFAULT: 'en',
  SUPPORTED: ['en', 'ne'] as const,
  LABELS: {
    en: 'English',
    ne: 'नेपाली',
  },
} as const;

// ==============================================
// API
// ==============================================

export const API = {
  VERSION: 'v1',
  BASE_URL: '/api',
  RATE_LIMIT: {
    ANONYMOUS: 60, // requests per minute
    AUTHENTICATED: 120,
    ADMIN: 300,
  },
} as const;

// ==============================================
// SOCIAL LINKS
// ==============================================

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/tdcjs',
  TWITTER: 'https://twitter.com/tdcjs',
  INSTAGRAM: 'https://instagram.com/tdcjs',
  YOUTUBE: 'https://youtube.com/@tdcjs',
} as const;

// ==============================================
// ERROR MESSAGES
// ==============================================

export const ERROR_MESSAGES = {
  // General
  GENERIC: 'Something went wrong. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  VALIDATION: 'Please check your input and try again.',

  // Auth
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  EMAIL_NOT_VERIFIED: 'Please verify your email address.',
  ACCOUNT_SUSPENDED: 'Your account has been suspended.',

  // Network
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',

  // File upload
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
} as const;

// ==============================================
// SUCCESS MESSAGES
// ==============================================

export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  CREATED: 'Created successfully.',
  UPDATED: 'Updated successfully.',
  DELETED: 'Deleted successfully.',
  EMAIL_SENT: 'Email sent successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
} as const;

// ==============================================
// REGEX PATTERNS
// ==============================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  URL: /^https?:\/\/.+/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

// ==============================================
// ANIMATION DURATIONS (in ms)
// ==============================================

export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// ==============================================
// BREAKPOINTS (matching Tailwind defaults)
// ==============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
