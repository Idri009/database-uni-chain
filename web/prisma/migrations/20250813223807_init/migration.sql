-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "defaultWallet" VARCHAR(42),
    "displayName" VARCHAR(100),
    "avatarCid" VARCHAR(100),
    "birthYear" INTEGER,
    "school" VARCHAR(200),
    "className" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "address" VARCHAR(42) NOT NULL,
    "userId" UUID NOT NULL,
    "ensName" VARCHAR(100),
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "nft_collections" (
    "chainId" INTEGER NOT NULL,
    "contractAddress" VARCHAR(42) NOT NULL,
    "standard" VARCHAR(20) NOT NULL,
    "name" VARCHAR(200),
    "symbol" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_collections_pkey" PRIMARY KEY ("chainId","contractAddress")
);

-- CreateTable
CREATE TABLE "nfts" (
    "chainId" INTEGER NOT NULL,
    "contractAddress" VARCHAR(42) NOT NULL,
    "tokenId" VARCHAR(100) NOT NULL,
    "metadataUri" TEXT,
    "metadataJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("chainId","contractAddress","tokenId")
);

-- CreateTable
CREATE TABLE "user_nfts" (
    "userId" UUID NOT NULL,
    "chainId" INTEGER NOT NULL,
    "contractAddress" VARCHAR(42) NOT NULL,
    "tokenId" VARCHAR(100) NOT NULL,
    "balance" DECIMAL(78,0) NOT NULL DEFAULT 1,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_nfts_pkey" PRIMARY KEY ("userId","chainId","contractAddress","tokenId")
);

-- CreateIndex
CREATE INDEX "wallets_userId_idx" ON "wallets"("userId");

-- CreateIndex
CREATE INDEX "nfts_contractAddress_tokenId_idx" ON "nfts"("contractAddress", "tokenId");

-- CreateIndex
CREATE INDEX "user_nfts_userId_lastSeenAt_idx" ON "user_nfts"("userId", "lastSeenAt");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts" ADD CONSTRAINT "nfts_chainId_contractAddress_fkey" FOREIGN KEY ("chainId", "contractAddress") REFERENCES "nft_collections"("chainId", "contractAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_nfts" ADD CONSTRAINT "user_nfts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_nfts" ADD CONSTRAINT "user_nfts_chainId_contractAddress_fkey" FOREIGN KEY ("chainId", "contractAddress") REFERENCES "nft_collections"("chainId", "contractAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_nfts" ADD CONSTRAINT "user_nfts_chainId_contractAddress_tokenId_fkey" FOREIGN KEY ("chainId", "contractAddress", "tokenId") REFERENCES "nfts"("chainId", "contractAddress", "tokenId") ON DELETE CASCADE ON UPDATE CASCADE;
