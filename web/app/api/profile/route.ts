import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const ProfileUpdateSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  birthYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  school: z.string().max(200).optional(),
  className: z.string().max(100).optional(),
  avatarCid: z.string().max(100).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        displayName: true,
        birthYear: true,
        school: true,
        className: true,
        avatarCid: true,
        defaultWallet: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      avatarUrl: user.avatarCid ? `https://gateway.pinata.cloud/ipfs/${user.avatarCid}` : null,
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate input
    const validationResult = ProfileUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Invalid input data',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    const updateData = validationResult.data;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
      select: {
        id: true,
        displayName: true,
        birthYear: true,
        school: true,
        className: true,
        avatarCid: true,
        defaultWallet: true,
        updatedAt: true,
      },
    });

    console.log('👤 Profile updated for user:', session.userId, updateData);

    return NextResponse.json({
      ...updatedUser,
      avatarUrl: updatedUser.avatarCid ? `https://gateway.pinata.cloud/ipfs/${updatedUser.avatarCid}` : null,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
