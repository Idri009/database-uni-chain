'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useState, useEffect } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check if user is already authenticated
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const signInWithEthereum = async () => {
    if (!address) return;
    
    setIsSigningIn(true);
    try {
      // 1. Get nonce
      const nonceResponse = await fetch('/api/siwe/nonce');
      const { nonce } = await nonceResponse.json();

      // 2. Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in to UNI Chain Profile to access your academic certificates.',
        uri: window.location.origin,
        version: '1',
        chainId: 84532, // Base Sepolia
        nonce: nonce,
      });

      // 3. Sign message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // 4. Verify signature
      const verifyResponse = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.prepareMessage(),
          signature,
        }),
      });

      if (verifyResponse.ok) {
        const data = await verifyResponse.json();
        setIsAuthenticated(true);
        // Load full user data from /api/me after successful login
        await loadUserData();
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('SIWE login failed:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎓 Welcome back!
            </h1>
            <p className="text-gray-600 text-sm">
              Successfully authenticated with UNI Chain Profile
            </p>
          </div>
          
          {/* User Info */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-800 mb-3">👤 Profile Information</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>User ID:</strong> {user.id.slice(0, 8)}...</p>
              <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
              <p><strong>Default Wallet:</strong> {user.defaultWallet?.slice(0, 6)}...{user.defaultWallet?.slice(-4)}</p>
              <p><strong>School:</strong> {user.school || 'Not set'}</p>
              <p><strong>Class:</strong> {user.className || 'Not set'}</p>
              <p><strong>Birth Year:</strong> {user.birthYear || 'Not set'}</p>
            </div>
          </div>

          {/* Wallets */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-3">💼 Connected Wallets ({user.wallets?.length || 0})</h3>
            {user.wallets && user.wallets.length > 0 ? (
              <div className="space-y-2">
                {user.wallets.map((wallet: any, index: number) => (
                  <div key={wallet.address} className="text-sm text-gray-700 bg-white p-2 rounded">
                    <p><strong>#{index + 1}:</strong> {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                    {wallet.ensName && <p><strong>ENS:</strong> {wallet.ensName}</p>}
                    <p><strong>Verified:</strong> {new Date(wallet.verifiedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No wallets connected</p>
            )}
          </div>

          {/* NFTs */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-3">🏆 NFT Certificates ({user.userNfts?.length || 0})</h3>
            {user.userNfts && user.userNfts.length > 0 ? (
              <div className="space-y-3">
                {user.userNfts.map((userNft: any, index: number) => (
                  <div key={`${userNft.contractAddress}-${userNft.tokenId}`} className="text-sm text-gray-700 bg-white p-3 rounded">
                    <p><strong>Certificate #{index + 1}:</strong> {userNft.nft?.metadataJson?.name || 'Unknown Certificate'}</p>
                    <p><strong>Collection:</strong> {userNft.nft?.collection?.name || 'Unknown Collection'}</p>
                    <p><strong>Standard:</strong> {userNft.nft?.collection?.standard}</p>
                    <p><strong>Balance:</strong> {userNft.balance}</p>
                    <p><strong>Chain:</strong> {userNft.chainId} (Base Sepolia)</p>
                    <p><strong>Contract:</strong> {userNft.contractAddress.slice(0, 6)}...{userNft.contractAddress.slice(-4)}</p>
                    <p><strong>Token ID:</strong> {userNft.tokenId}</p>
                    <p><strong>Last Seen:</strong> {new Date(userNft.lastSeenAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No NFT certificates found. Connect your wallet to sync your certificates.</p>
            )}
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <ConnectButton />
            <button
              onClick={loadUserData}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={signOut}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1 mt-6 text-center">
            <p>🌐 Network: Base Sepolia (84532)</p>
            <p>✅ Authenticated via SIWE</p>
            <p>📊 API: /api/me working</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎓 UNI Chain Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Connect your wallet and sign in to manage your academic profile and view your NFT certificates on Base Sepolia testnet
          </p>
        </div>
        
        <div className="mb-6">
          <ConnectButton />
        </div>

        {isConnected && address && (
          <div className="mb-6">
            <button
              onClick={signInWithEthereum}
              disabled={isSigningIn}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSigningIn ? 'Signing in...' : '✍️ Sign-In with Ethereum (SIWE)'}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Sign a message to authenticate and create your profile
            </p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>🌐 Network: Base Sepolia Testnet (84532)</p>
          <p>💼 Supports MetaMask & other wallets</p>
          <p>🔒 Secure authentication via SIWE</p>
        </div>
      </div>
    </div>
  );
}