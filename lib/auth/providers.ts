/**
 * NextAuth.js v5 Providers
 * Authentication providers configuration
 */

import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import { verifyPassword } from './password';
import { loginSchema } from '@/lib/validations/auth';

/**
 * Credentials provider for email/password authentication
 */
const credentialsProvider = Credentials({
  id: 'credentials',
  name: 'Email & Password',
  
  credentials: {
    email: { 
      label: 'Email', 
      type: 'email',
      placeholder: 'Enter your email',
    },
    password: { 
      label: 'Password', 
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
  
  async authorize(credentials) {
    try {
      // Validate input
      const parsed = loginSchema.safeParse(credentials);
      
      if (!parsed.success) {
        console.error('Validation failed:', parsed.error.issues);
        return null;
      }
      
      const { email, password } = parsed.data;
      
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          password: true,
          image: true,
          role: true,
          status: true,
          emailVerified: true,
        },
      });
      
      // User not found
      if (!user) {
        console.log(`Login failed: User not found for email ${email}`);
        return null;
      }
      
      // No password (OAuth user)
      if (!user.password) {
        console.log(`Login failed: No password set for ${email}`);
        return null;
      }
      
      // Check account status
      if (user.status === 'SUSPENDED' || user.status === 'BANNED') {
        console.log(`Login failed: Account ${user.status} for ${email}`);
        throw new Error(`Account ${user.status.toLowerCase()}`);
      }
      
      if (user.status === 'INACTIVE') {
        console.log(`Login failed: Account inactive for ${email}`);
        throw new Error('Account inactive');
      }
      
      // Verify password
      const isPasswordValid = await verifyPassword(password, user.password);
      
      if (!isPasswordValid) {
        console.log(`Login failed: Invalid password for ${email}`);
        return null;
      }
      
      // Return user data (without password)
      console.log(`Login successful for ${email}`);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        image: user.image,
        role: user.role,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      console.error('Authorization error:', error);
      throw error;
    }
  },
});

/**
 * All authentication providers
 * Add more providers here (Google, GitHub, etc.)
 */
export const providers: Provider[] = [
  credentialsProvider,
  // Add more providers here:
  // Google({
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // }),
  // GitHub({
  //   clientId: process.env.GITHUB_CLIENT_ID,
  //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
  // }),
];

export default providers;
