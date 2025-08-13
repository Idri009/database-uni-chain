'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎓 UNI Chain Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Connect your wallet to manage your academic profile and view your NFT certificates on Sepolia testnet
          </p>
        </div>
        
        <div className="mb-6">
          <ConnectButton />
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>🌐 Network: Sepolia Testnet</p>
          <p>💼 Supports MetaMask & other wallets</p>
          <p>🔒 Secure wallet connection via RainbowKit</p>
        </div>
      </div>
    </div>
  );
}
