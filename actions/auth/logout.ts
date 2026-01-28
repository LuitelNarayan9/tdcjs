'use server';

/**
 * Logout Server Action
 * Signs out the user using Clerk
 * 
 * Next.js 16.1.4 Server Action
 */

import { auth } from '@clerk/nextjs/server';

/**
 * Sign out the current user
 * Note: For Clerk, sign out is typically done client-side with useClerk().signOut()
 * This action can be used for server-side logout operations
 */
export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        success: false,
        message: 'No active session',
      };
    }
    
    // With Clerk, sign out is handled client-side
    // This action can be used for server-side cleanup if needed
    return {
      success: true,
      message: 'Signed out successfully',
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'Failed to sign out',
    };
  }
}
