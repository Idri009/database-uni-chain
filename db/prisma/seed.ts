import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440000' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      displayName: 'Alice Nguyen',
      avatarCid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      birthYear: 2001,
      school: 'Đại học Kinh tế TP.HCM',
      className: 'K47-QTKD',
      defaultWallet: '0x742d35Cc6634C0532925a3b8D4140E1B4Bb2Ac52',
    },
  });

  // Create wallet for the user
  const wallet = await prisma.wallet.upsert({
    where: { address: '0x742d35Cc6634C0532925a3b8D4140E1B4Bb2Ac52' },
    update: {},
    create: {
      address: '0x742d35Cc6634C0532925a3b8D4140E1B4Bb2Ac52',
      userId: user.id,
      ensName: 'alice.eth',
      verifiedAt: new Date(),
    },
  });

  // Create NFT collection (UNI Certificate)
  const collection = await prisma.nftCollection.upsert({
    where: {
      chainId_contractAddress: {
        chainId: 11155111, // Sepolia
        contractAddress: '0x1234567890123456789012345678901234567890',
      },
    },
    update: {},
    create: {
      chainId: 11155111,
      contractAddress: '0x1234567890123456789012345678901234567890',
      standard: 'ERC721',
      name: 'UNI Academic Certificates',
      symbol: 'UNIAC',
    },
  });

  // Create NFT (Academic Certificate)
  const nft = await prisma.nft.upsert({
    where: {
      chainId_contractAddress_tokenId: {
        chainId: 11155111,
        contractAddress: '0x1234567890123456789012345678901234567890',
        tokenId: '1',
      },
    },
    update: {},
    create: {
      chainId: 11155111,
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: '1',
      metadataUri: 'ipfs://QmHash/metadata.json',
      metadataJson: {
        name: 'Bachelor of Economics Degree',
        description: 'Academic certificate for completing Bachelor of Economics program',
        image: 'ipfs://QmImageHash/certificate.png',
        attributes: [
          { trait_type: 'Degree', value: 'Bachelor of Economics' },
          { trait_type: 'University', value: 'UEH' },
          { trait_type: 'Year', value: '2024' },
          { trait_type: 'GPA', value: '3.8' },
        ],
      },
    },
  });

  // Link user to NFT
  const userNft = await prisma.userNft.upsert({
    where: {
      userId_chainId_contractAddress_tokenId: {
        userId: user.id,
        chainId: 11155111,
        contractAddress: '0x1234567890123456789012345678901234567890',
        tokenId: '1',
      },
    },
    update: {},
    create: {
      userId: user.id,
      chainId: 11155111,
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: '1',
      balance: 1,
      lastSeenAt: new Date(),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('📝 Created:');
  console.log('  - User:', user.displayName);
  console.log('  - Wallet:', wallet.address);
  console.log('  - Collection:', collection.name);
  console.log('  - NFT:', nft.metadataJson?.name);
  console.log('  - UserNft link with balance:', userNft.balance.toString());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
