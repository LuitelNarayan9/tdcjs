/**
 * API Route: rsvp
 * TODO: Implement this route
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This API route is under construction',
    route: 'rsvp'
  }, { status: 501 });
}
