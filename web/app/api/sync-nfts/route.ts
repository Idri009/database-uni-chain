import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import axios from 'axios'
import { ethers } from 'ethers'
import eduHubJson from '../../../EduHub.json'

const BASE_SEPOLIA_CHAIN_ID = 84532

// Type for NFT metadata
interface NftMetadata {
  name?: string
  description?: string
  image?: string
  [key: string]: any
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = getSession(request)
    if (!session?.address) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(request.url)
    const targetAddress = url.searchParams.get('address')?.toLowerCase() || session.address.toLowerCase()
    const mode = url.searchParams.get('mode') || 'eduhub' // 'eduhub' or 'allowlist'

    // Verify address belongs to user (security check)
    const user = await db.user.findFirst({
      where: {
        wallets: {
          some: {
            address: targetAddress
          }
        }
      },
      include: {
        wallets: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Address not associated with your account' }, { status: 403 })
    }

    // Environment variables validation
    const alchemyApiKey = process.env.ALCHEMY_API_KEY
    const alchemyNetwork = process.env.ALCHEMY_NETWORK || 'base-sepolia'
    const eduHubAddress = process.env.EDUHUB_CONTRACT
    const certContracts = process.env.CERT_CONTRACTS?.split(',').map(addr => addr.toLowerCase().trim()) || []
    
    if (!alchemyApiKey) {
      return NextResponse.json({ error: 'ALCHEMY_API_KEY not configured' }, { status: 500 })
    }

    if (mode === 'eduhub' && !eduHubAddress) {
      return NextResponse.json({ error: 'EDUHUB_CONTRACT not configured' }, { status: 500 })
    }

    if (mode === 'allowlist' && certContracts.length === 0) {
      return NextResponse.json({ error: 'CERT_CONTRACTS not configured' }, { status: 500 })
    }

    // Setup ethers provider (only if using eduhub mode)
    let eduHub = null
    if (mode === 'eduhub' && eduHubAddress) {
      const provider = new ethers.JsonRpcProvider(`https://${alchemyNetwork}.g.alchemy.com/v2/${alchemyApiKey}`)
      eduHub = new ethers.Contract(eduHubAddress, eduHubJson.abi, provider)
    }

    // Get all NFTs for the address from Alchemy
    const alchemyUrl = `https://${alchemyNetwork}.g.alchemy.com/nft/v3/${alchemyApiKey}/getNFTsForOwner?owner=${targetAddress}`
    const { data: alchemyData } = await axios.get(alchemyUrl)
    const allNfts = alchemyData.ownedNfts || []

    console.log(`Found ${allNfts.length} total NFTs for address ${targetAddress}`)
    console.log(`Filtering mode: ${mode}`)

    // Filter for certified NFTs based on mode
    const certifiedNfts = []
    let processedCount = 0

    for (const nft of allNfts) {
      processedCount++
      if (processedCount % 10 === 0) {
        console.log(`Processed ${processedCount}/${allNfts.length} NFTs`)
      }

      const contractAddress = nft.contract.address.toLowerCase()
      let isCertified = false

      try {
        if (mode === 'eduhub' && eduHub) {
          // Check if NFT contract is registered in EduHub
          isCertified = await eduHub.isEduNFT(contractAddress)
        } else if (mode === 'allowlist') {
          // Check if contract is in allowlist
          isCertified = certContracts.includes(contractAddress)
        }

        if (isCertified) {
          // Get metadata from tokenURI if available
          let metadata: NftMetadata | null = null
          if (nft.raw?.metadata) {
            metadata = nft.raw.metadata
          } else if (nft.tokenUri) {
            try {
              let tokenUri = nft.tokenUri
              // Convert IPFS URI to gateway
              if (tokenUri.startsWith('ipfs://')) {
                tokenUri = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
              }
              const metaResponse = await axios.get(tokenUri, { timeout: 5000 })
              metadata = metaResponse.data
            } catch (metaError) {
              console.warn(`Failed to fetch metadata for ${contractAddress}:${nft.tokenId}`)
            }
          }

          certifiedNfts.push({
            chainId: BASE_SEPOLIA_CHAIN_ID,
            contractAddress,
            tokenId: nft.tokenId,
            tokenType: nft.tokenType || 'ERC721',
            name: nft.contract.name || null,
            symbol: nft.contract.symbol || null,
            balance: nft.balance || '1',
            metadata,
            tokenUri: nft.tokenUri || null,
            description: nft.description || metadata?.description || null,
            image: nft.image?.originalUrl || metadata?.image || null
          })
        }
      } catch (contractError) {
        // Skip if contract call fails
        continue
      }
    }

    console.log(`Found ${certifiedNfts.length} certified NFTs for address ${targetAddress}`)

    // Database operations - upsert collections, NFTs, and user relationships
    let collectionsUpserted = 0
    let nftsUpserted = 0
    let userNftsUpserted = 0

    for (const certNft of certifiedNfts) {
      try {
        // 1. Upsert NftCollection
        await db.nftCollection.upsert({
          where: {
            chainId_contractAddress: {
              chainId: certNft.chainId,
              contractAddress: certNft.contractAddress
            }
          },
          update: {
            name: certNft.name,
            symbol: certNft.symbol,
            updatedAt: new Date()
          },
          create: {
            chainId: certNft.chainId,
            contractAddress: certNft.contractAddress,
            standard: certNft.tokenType,
            name: certNft.name,
            symbol: certNft.symbol
          }
        })
        collectionsUpserted++

        // 2. Upsert Nft
        await db.nft.upsert({
          where: {
            chainId_contractAddress_tokenId: {
              chainId: certNft.chainId,
              contractAddress: certNft.contractAddress,
              tokenId: certNft.tokenId
            }
          },
          update: {
            metadataUri: certNft.tokenUri,
            metadataJson: certNft.metadata as any,
            updatedAt: new Date()
          },
          create: {
            chainId: certNft.chainId,
            contractAddress: certNft.contractAddress,
            tokenId: certNft.tokenId,
            metadataUri: certNft.tokenUri,
            metadataJson: certNft.metadata as any
          }
        })
        nftsUpserted++

        // 3. Upsert UserNft
        await db.userNft.upsert({
          where: {
            userId_chainId_contractAddress_tokenId: {
              userId: user.id,
              chainId: certNft.chainId,
              contractAddress: certNft.contractAddress,
              tokenId: certNft.tokenId
            }
          },
          update: {
            balance: certNft.balance,
            lastSeenAt: new Date()
          },
          create: {
            userId: user.id,
            chainId: certNft.chainId,
            contractAddress: certNft.contractAddress,
            tokenId: certNft.tokenId,
            balance: certNft.balance,
            lastSeenAt: new Date()
          }
        })
        userNftsUpserted++

      } catch (dbError) {
        console.error(`Database error for NFT ${certNft.contractAddress}:${certNft.tokenId}:`, dbError)
      }
    }

    // Return summary
    return NextResponse.json({
      success: true,
      summary: {
        address: targetAddress,
        mode,
        totalNftsScanned: allNfts.length,
        certifiedNftsFound: certifiedNfts.length,
        collectionsUpserted,
        nftsUpserted,
        userNftsUpserted
      },
      certifiedNfts: certifiedNfts.map(nft => ({
        contract: nft.contractAddress,
        tokenId: nft.tokenId,
        name: nft.name,
        description: nft.description,
        image: nft.image
      }))
    })

  } catch (error) {
    console.error('NFT sync error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to sync NFTs',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = getSession(request)
    if (!session?.address) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's synced NFTs from database
    const user = await db.user.findFirst({
      where: {
        wallets: {
          some: {
            address: session.address.toLowerCase()
          }
        }
      },
      include: {
        userNfts: {
          include: {
            nft: {
              include: {
                collection: true
              }
            }
          },
          orderBy: {
            lastSeenAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Format NFT data for frontend
    const nfts = user.userNfts.map(userNft => {
      const metadata = userNft.nft.metadataJson as NftMetadata | null
      
      return {
        id: `${userNft.chainId}_${userNft.contractAddress}_${userNft.tokenId}`,
        chainId: userNft.chainId,
        contractAddress: userNft.contractAddress,
        tokenId: userNft.tokenId,
        balance: userNft.balance.toString(),
        lastSeenAt: userNft.lastSeenAt,
        collection: {
          name: userNft.nft.collection.name,
          symbol: userNft.nft.collection.symbol,
          standard: userNft.nft.collection.standard
        },
        metadata: metadata,
        metadataUri: userNft.nft.metadataUri,
        // Helper fields for UI
        name: metadata?.name || userNft.nft.collection.name,
        description: metadata?.description,
        image: metadata?.image,
        // Convert IPFS to gateway URL
        imageUrl: metadata?.image?.startsWith('ipfs://') 
          ? metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : metadata?.image
      }
    })

    return NextResponse.json({
      success: true,
      nfts,
      count: nfts.length
    })

  } catch (error) {
    console.error('Get NFTs error:', error)
    return NextResponse.json(
      { error: 'Failed to get NFTs' }, 
      { status: 500 }
    )
  }
}
