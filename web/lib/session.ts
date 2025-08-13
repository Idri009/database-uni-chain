import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface SessionData {
  userId: string;
  address: string;
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-in-production';

export function createSessionToken(data: SessionData): string {
  return jwt.sign(data, SESSION_SECRET, { expiresIn: '7d' });
}

export function verifySessionToken(token: string): SessionData | null {
  try {
    return jwt.verify(token, SESSION_SECRET) as SessionData;
  } catch {
    return null;
  }
}

export function getSession(req: NextRequest): SessionData | null {
  const sessionCookie = req.cookies.get('session');
  if (!sessionCookie?.value) return null;
  
  return verifySessionToken(sessionCookie.value);
}

export function createSessionCookie(data: SessionData): string {
  const token = createSessionToken(data);
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  const isProduction = process.env.NODE_ENV === 'production';
  
  return `session=${token}; HttpOnly; ${isProduction ? 'Secure;' : ''} SameSite=Lax; Max-Age=${maxAge}; Path=/`;
}
