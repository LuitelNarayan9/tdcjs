/**
 * Authentication types
 * Types related to authentication and authorization
 */

// ==============================================
// USER SESSION TYPES
// ==============================================

/**
 * Session user (minimal user data stored in session)
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  image: string | null;
  role: UserRole;
  emailVerified: Date | null;
}

/**
 * Extended session with custom properties
 */
export interface Session {
  user: SessionUser;
  expires: string;
  accessToken?: string;
}

// ==============================================
// ROLE & PERMISSION TYPES
// ==============================================

/**
 * User roles
 */
export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MODERATOR'
  | 'EDITOR'
  | 'MEMBER'
  | 'USER';

/**
 * User status
 */
export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PENDING'
  | 'SUSPENDED'
  | 'BANNED';

/**
 * Permission types
 */
export type Permission =
  | 'user:read'
  | 'user:write'
  | 'user:delete'
  | 'content:read'
  | 'content:write'
  | 'content:delete'
  | 'content:moderate'
  | 'admin:access'
  | 'admin:users'
  | 'admin:settings';

/**
 * Role with permissions
 */
export interface RoleWithPermissions {
  role: UserRole;
  permissions: Permission[];
}

// ==============================================
// AUTH RESULT TYPES
// ==============================================

/**
 * Authentication result
 */
export interface AuthResult {
  success: boolean;
  message?: string;
  user?: SessionUser;
  requiresTwoFactor?: boolean;
  requiresEmailVerification?: boolean;
}

/**
 * Token payload
 */
export interface TokenPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

/**
 * Verification token types
 */
export type VerificationTokenType =
  | 'EMAIL_VERIFICATION'
  | 'PASSWORD_RESET'
  | 'TWO_FACTOR'
  | 'INVITE';

/**
 * OAuth provider types
 */
export type OAuthProvider = 'google' | 'facebook' | 'github';

/**
 * OAuth account link
 */
export interface OAuthAccount {
  provider: OAuthProvider;
  providerAccountId: string;
  email?: string;
  name?: string;
  image?: string;
}

// ==============================================
// AUTH STATE TYPES
// ==============================================

/**
 * Auth loading states
 */
export type AuthState = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/**
 * Auth context value
 */
export interface AuthContextValue {
  user: SessionUser | null;
  status: AuthState;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

// ==============================================
// TYPE GUARDS
// ==============================================

/**
 * Check if user has a specific role
 */
export function hasRole(user: SessionUser | null, role: UserRole): boolean {
  if (!user) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    SUPER_ADMIN: 100,
    ADMIN: 80,
    MODERATOR: 60,
    EDITOR: 40,
    MEMBER: 20,
    USER: 10,
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[role];
}

/**
 * Check if user is admin
 */
export function isAdmin(user: SessionUser | null): boolean {
  return hasRole(user, 'ADMIN');
}

/**
 * Check if user is moderator or above
 */
export function isModerator(user: SessionUser | null): boolean {
  return hasRole(user, 'MODERATOR');
}
