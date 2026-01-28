/**
 * API Route: suspend
 * TODO: Implement this route
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This API route is under construction',
    route: 'suspend'
  }, { status: 501 });
}
