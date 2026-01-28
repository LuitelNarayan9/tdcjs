/**
 * Test Setup
 * Configuration for Vitest testing environment
 * 
 * Next.js 16.1.4 - Testing Infrastructure
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ============================================
// MOCK CONFIGURATION
// ============================================

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock Next.js headers
vi.mock('next/headers', () => ({
  headers: () => new Headers(),
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}));

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  auth: () => ({
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    orgId: null,
    orgRole: null,
    orgSlug: null,
  }),
  currentUser: () => ({
    id: 'test-user-id',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
    firstName: 'Test',
    lastName: 'User',
    publicMetadata: { role: 'USER' },
  }),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  SignedIn: ({ children }: { children: React.ReactNode }) => children,
  SignedOut: ({ children }: { children: React.ReactNode }) => children,
  SignInButton: ({ children }: { children: React.ReactNode }) => children,
  SignOutButton: ({ children }: { children: React.ReactNode }) => children,
  UserButton: () => null,
}));

// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    forumThread: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    forumPost: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    blogPost: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    news: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

// ============================================
// GLOBAL TEST UTILITIES
// ============================================

// Suppress console errors during tests (optional)
// global.console = {
//   ...console,
//   error: vi.fn(),
//   warn: vi.fn(),
// };

// Extend expect matchers
declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): T;
    toHaveClass(className: string): T;
    toHaveAttribute(attr: string, value?: string): T;
    toHaveTextContent(text: string): T;
  }
}

// ============================================
// TEST DATA HELPERS
// ============================================

export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  username: 'testuser',
  role: 'USER',
  status: 'ACTIVE',
  profileImage: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockThread = (overrides = {}) => ({
  id: 'thread-1',
  title: 'Test Thread',
  slug: 'test-thread',
  content: 'This is a test thread',
  userId: 'user-1',
  categoryId: 'category-1',
  isPinned: false,
  isLocked: false,
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockBlogPost = (overrides = {}) => ({
  id: 'blog-1',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'Test excerpt',
  content: 'This is a test blog post',
  userId: 'user-1',
  categoryId: 'category-1',
  status: 'PUBLISHED',
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockNews = (overrides = {}) => ({
  id: 'news-1',
  title: 'Test News',
  slug: 'test-news',
  excerpt: 'Test excerpt',
  content: 'This is test news',
  categoryId: 'category-1',
  isFeatured: false,
  priority: 'NORMAL',
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
