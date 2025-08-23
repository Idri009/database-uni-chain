import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        wallets: {
          select: {
            address: true,
            ensName: true,
            verifiedAt: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        displayName: user.displayName,
        avatarCid: user.avatarCid,
        birthYear: user.birthYear,
        school: user.school,
        className: user.className,
        defaultWallet: user.defaultWallet,
        wallets: user.wallets,
      },
      session: {
        userId: session.userId,
        address: session.address,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
