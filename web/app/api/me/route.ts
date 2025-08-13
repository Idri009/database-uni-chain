import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Check session
    const session = getSession(req);
    console.log('🔍 Session check in /api/me:', session);
    
    if (!session) {
      console.log('❌ No session found in /api/me');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user with full data
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        wallets: {
          select: {
            address: true,
            ensName: true,
            verifiedAt: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        userNfts: {
          include: {
            nft: {
              include: {
                collection: {
                  select: {
                    chainId: true,
                    contractAddress: true,
                    standard: true,
                    name: true,
                    symbol: true,
                  },
                },
              },
            },
          },
          orderBy: {
            lastSeenAt: 'desc',
          },
        },
      },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Format response
    const response = {
      id: user.id,
      defaultWallet: user.defaultWallet,
      displayName: user.displayName,
      avatarCid: user.avatarCid,
      birthYear: user.birthYear,
      school: user.school,
      className: user.className,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      wallets: user.wallets,
      userNfts: user.userNfts.map((userNft: any) => ({
        chainId: userNft.chainId,
        contractAddress: userNft.contractAddress,
        tokenId: userNft.tokenId,
        balance: userNft.balance.toString(),
        lastSeenAt: userNft.lastSeenAt,
        createdAt: userNft.createdAt,
        nft: {
          metadataUri: userNft.nft.metadataUri,
          metadataJson: userNft.nft.metadataJson,
          collection: userNft.nft.collection,
        },
      })),
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('API /api/me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
