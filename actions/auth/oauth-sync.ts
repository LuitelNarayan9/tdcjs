'use server';

/**
 * OAuth User Sync Action
 * Syncs OAuth users (Google, etc.) with our database
 * Called after successful OAuth authentication
 * 
 * Next.js 16.1.4 - Server Action
 */

import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

interface OAuthUserData {
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  imageUrl: string | null;
}

/**
 * Sync OAuth user with database
 * Creates user if not exists, updates if exists
 */
export async function syncOAuthUser(userData: OAuthUserData) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    const { email, firstName, lastName, username, imageUrl } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: clerkId },
    });

    if (existingUser) {
      // Update existing user
      await prisma.user.update({
        where: { id: clerkId },
        data: {
          email: email.toLowerCase(),
          name: [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0],
          username: username?.toLowerCase() || null,
          profileImage: imageUrl,
          emailVerified: new Date(),
          status: 'ACTIVE',
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        message: 'User updated successfully',
        isNewUser: false,
      };
    }

    // Create new user
    await prisma.user.create({
      data: {
        id: clerkId,
        email: email.toLowerCase(),
        password: '', // OAuth users don't have passwords
        name: [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0],
        username: username?.toLowerCase() || null,
        profileImage: imageUrl,
        role: 'USER',
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    });

    return {
      success: true,
      message: 'User created successfully',
      isNewUser: true,
    };
  } catch (error) {
    console.error('OAuth sync error:', error);
    return {
      success: false,
      error: 'Failed to sync user data',
    };
  }
}

/**
 * Get OAuth user data from Clerk session
 * Used to sync after OAuth login
 */
export async function getOAuthUserData() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: 'Not authenticated',
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        status: true,
        profileImage: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Get OAuth user data error:', error);
    return {
      success: false,
      error: 'Failed to get user data',
    };
  }
}
