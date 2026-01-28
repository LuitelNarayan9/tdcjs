/**
 * Clerk Webhook Handler
 * Syncs Clerk users with our database
 * 
 * Handles: user.created, user.updated, user.deleted events
 */

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  // Get the webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name, username, public_metadata } = evt.data;
        const email = email_addresses[0]?.email_address;
        
        if (!email) {
          console.error('No email address for user:', id);
          break;
        }

        // Check if user already exists (from our registration flow)
        const existingUser = await prisma.user.findUnique({
          where: { id },
        });

        if (!existingUser) {
          // Create user if not exists (e.g., from Clerk dashboard or OAuth)
          await prisma.user.create({
            data: {
              id,
              email: email.toLowerCase(),
              password: '', // Clerk handles passwords
              name: [first_name, last_name].filter(Boolean).join(' ') || email.split('@')[0],
              username: username?.toLowerCase() || null,
              role: (public_metadata?.role as 'USER' | 'ADMIN' | 'MODERATOR') || 'USER',
              status: 'ACTIVE', // Created via Clerk means already verified
              emailVerified: new Date(),
            },
          });
          console.log('Created user from Clerk webhook:', id);
        }
        break;
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name, username, public_metadata } = evt.data;
        const email = email_addresses[0]?.email_address;

        await prisma.user.update({
          where: { id },
          data: {
            email: email?.toLowerCase(),
            name: [first_name, last_name].filter(Boolean).join(' '),
            username: username?.toLowerCase() || null,
            role: (public_metadata?.role as 'USER' | 'ADMIN' | 'MODERATOR') || undefined,
            status: (public_metadata?.status as 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'DELETED') || undefined,
            updatedAt: new Date(),
          },
        });
        console.log('Updated user from Clerk webhook:', id);
        break;
      }

      case 'user.deleted': {
        const { id } = evt.data;
        
        if (id) {
          // Soft delete - set status to DELETED (matches Prisma schema enum)
          await prisma.user.update({
            where: { id },
            data: {
              status: 'DELETED',
              updatedAt: new Date(),
            },
          });
          console.log('Deactivated user from Clerk webhook:', id);
        }
        break;
      }

      case 'session.created': {
        // Update last login time
        const { user_id } = evt.data;
        if (user_id) {
          await prisma.user.update({
            where: { id: user_id },
            data: { lastLoginAt: new Date() },
          });
        }
        break;
      }

      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}
