import { NextRequest, NextResponse } from 'next/server';
import { generateNonce } from 'siwe';

export async function GET() {
  try {
    const nonce = generateNonce();
    
    const response = NextResponse.json({ nonce });
    
    // Set nonce cookie (HttpOnly, 5 minutes expiry)
    response.cookies.set('siwe_nonce', nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300, // 5 minutes
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error generating nonce:', error);
    return NextResponse.json({ error: 'Failed to generate nonce' }, { status: 500 });
  }
}
