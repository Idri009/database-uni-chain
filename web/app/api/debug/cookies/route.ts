import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('session');
  const nonceCookie = req.cookies.get('siwe_nonce');
  
  return NextResponse.json({
    cookies: {
      session: sessionCookie?.value || null,
      siwe_nonce: nonceCookie?.value || null,
    },
    headers: Object.fromEntries(req.headers.entries()),
  });
}
