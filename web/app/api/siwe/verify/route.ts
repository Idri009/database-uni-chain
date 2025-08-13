import { NextRequest, NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { prisma } from '@/lib/prisma';
import { createSessionToken } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { message, signature } = await req.json();
    
    if (!message || !signature) {
      return NextResponse.json({ error: 'Message and signature required' }, { status: 400 });
    }
    
    // Get nonce from cookie
    const nonceCookie = req.cookies.get('siwe_nonce');
    if (!nonceCookie?.value) {
      return NextResponse.json({ error: 'Nonce not found or expired' }, { status: 400 });
    }
    
    // Parse and verify SIWE message
    const siweMessage = new SiweMessage(message);
    const verificationResult = await siweMessage.verify({
      signature,
      nonce: nonceCookie.value,
    });
    
    if (!verificationResult.success) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Normalize address to lowercase
    const address = siweMessage.address.toLowerCase();
    
    // Check if wallet exists
    let wallet = await prisma.wallet.findUnique({
      where: { address },
      include: { user: true },
    });
    
    let user;
    
    if (!wallet) {
      // Create new user and wallet
      user = await prisma.user.create({
        data: {
          defaultWallet: address,
          wallets: {
            create: {
              address,
              verifiedAt: new Date(),
            },
          },
        },
        include: { wallets: true },
      });
      
      wallet = user.wallets[0];
    } else {
      // Update existing wallet verification
      wallet = await prisma.wallet.update({
        where: { address },
        data: { verifiedAt: new Date() },
        include: { user: true },
      });
      
      user = wallet.user;
      
      // Ensure user has defaultWallet set
      if (!user.defaultWallet) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { defaultWallet: address },
        });
      }
    }
    
    // Create session
    const sessionData = {
      userId: user.id,
      address: address,
    };

    console.log('🔧 Creating session for user:', sessionData);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        displayName: user.displayName,
        defaultWallet: user.defaultWallet,
        address: address,
      },
    });
    
    // Set session cookie using NextResponse.cookies.set()
    const sessionToken = createSessionToken(sessionData);
    const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
    const isProduction = process.env.NODE_ENV === 'production';
    
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: maxAge,
      path: '/',
    });
    
        console.log('🍪 Session cookie set with NextResponse.cookies.set');
    
    // Clear nonce cookie
    response.cookies.delete('siwe_nonce');
    
    return response;
  } catch (error) {
    console.error('SIWE verification error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
