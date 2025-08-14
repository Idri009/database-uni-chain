/**
 * Helper functions for NFT and IPFS handling
 */

/**
 * Convert IPFS URI to gateway URL
 * @param uri - IPFS URI (ipfs://...) or regular URL
 * @param gateway - IPFS gateway to use (default: ipfs.io)
 * @returns Gateway URL
 */
export function ipfsToGateway(uri: string | null | undefined, gateway: string = 'https://ipfs.io/ipfs/'): string | null {
  if (!uri) return null
  
  if (uri.startsWith('ipfs://')) {
    const cid = uri.replace('ipfs://', '')
    return `${gateway}${cid}`
  }
  
  // Return as-is if already a regular URL
  return uri
}

/**
 * Get preferred IPFS gateway URL with fallbacks
 * @param uri - IPFS URI or regular URL
 * @returns Object with multiple gateway options
 */
export function getIpfsGateways(uri: string | null | undefined) {
  if (!uri) return { primary: null, fallbacks: [] }
  
  if (uri.startsWith('ipfs://')) {
    const cid = uri.replace('ipfs://', '')
    
    return {
      primary: `https://ipfs.io/ipfs/${cid}`,
      fallbacks: [
        `https://gateway.pinata.cloud/ipfs/${cid}`,
        `https://cloudflare-ipfs.com/ipfs/${cid}`,
        `https://dweb.link/ipfs/${cid}`,
        `https://${cid}.ipfs.dweb.link`
      ]
    }
  }
  
  return { primary: uri, fallbacks: [] }
}

/**
 * Extract contract info for display
 * @param contractAddress - Full contract address
 * @returns Shortened address for display
 */
export function formatContractAddress(contractAddress: string): string {
  if (!contractAddress || contractAddress.length < 10) return contractAddress
  
  return `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`
}

/**
 * Format NFT name with fallback
 * @param nft - NFT object with name and collection info
 * @returns Formatted display name
 */
export function formatNftName(nft: any): string {
  if (nft.name) return nft.name
  if (nft.collection?.name) return `${nft.collection.name} #${nft.tokenId}`
  return `NFT #${nft.tokenId}`
}

/**
 * Check if contract address is in allowlist
 * @param contractAddress - Contract address to check
 * @param allowlist - Array of allowed contract addresses
 * @returns Boolean indicating if contract is allowed
 */
export function isContractAllowed(contractAddress: string, allowlist: string[]): boolean {
  return allowlist.includes(contractAddress.toLowerCase())
}

/**
 * Validate NFT metadata structure
 * @param metadata - Raw metadata object
 * @returns Validated metadata with proper types
 */
export function validateNftMetadata(metadata: any) {
  if (!metadata || typeof metadata !== 'object') {
    return { name: null, description: null, image: null }
  }
  
  return {
    name: typeof metadata.name === 'string' ? metadata.name : null,
    description: typeof metadata.description === 'string' ? metadata.description : null,
    image: typeof metadata.image === 'string' ? metadata.image : null,
    attributes: Array.isArray(metadata.attributes) ? metadata.attributes : [],
    ...metadata
  }
}
