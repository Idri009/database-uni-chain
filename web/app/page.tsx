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
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
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
        setUser(data.user);
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
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎓 Welcome back!
            </h1>
            <p className="text-gray-600 text-sm">
              Successfully authenticated with UNI Chain Profile
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>User ID:</strong> {user.id.slice(0, 8)}...</p>
              <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
              <p><strong>Wallet:</strong> {user.defaultWallet?.slice(0, 6)}...{user.defaultWallet?.slice(-4)}</p>
              <p><strong>School:</strong> {user.school || 'Not set'}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <ConnectButton />
            <button
              onClick={signOut}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1 mt-6">
            <p>🌐 Network: Base Sepolia (84532)</p>
            <p>✅ Authenticated via SIWE</p>
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