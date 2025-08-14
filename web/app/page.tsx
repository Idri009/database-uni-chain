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
    const nftCount = user.userNfts?.length || 0;
    const walletCount = user.wallets?.length || 0;
    const completionPercentage = Math.round(
      (Number(!!user.displayName) + 
       Number(!!user.school) + 
       Number(!!user.className) + 
       Number(!!user.birthYear) + 
       Number(!!user.avatarCid)) / 5 * 100
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {/* Hero Section */}
        <div className="pt-8 pb-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-white mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                🎓 UNI Chain Profile
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-2">
                Welcome back, {user.displayName || 'Scholar'}!
              </p>
              <p className="text-white/60">
                Your academic achievements on Base Sepolia
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center text-white">
                <div className="text-2xl md:text-3xl font-bold">{nftCount}</div>
                <div className="text-sm text-white/80">Certificates</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center text-white">
                <div className="text-2xl md:text-3xl font-bold">{walletCount}</div>
                <div className="text-sm text-white/80">Wallets</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center text-white">
                <div className="text-2xl md:text-3xl font-bold">{completionPercentage}%</div>
                <div className="text-sm text-white/80">Profile</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center text-white">
                <div className="text-2xl md:text-3xl font-bold">84532</div>
                <div className="text-sm text-white/80">Chain ID</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button
                onClick={() => window.location.href = '/profile'}
                className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={loadUserData}
                className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2"
              >
                🔄 Refresh
              </button>
              <ConnectButton />
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  👤 Profile Overview
                </h2>
                
                <div className="text-center mb-6">
                  {user.avatarCid ? (
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${user.avatarCid}`}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200 shadow-lg mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                      {user.displayName ? user.displayName.slice(0, 2).toUpperCase() : '👤'}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-800">
                    {user.displayName || 'Anonymous Scholar'}
                  </h3>
                  
                  {user.school && (
                    <p className="text-gray-600 flex items-center justify-center gap-1">
                      🎓 {user.school}
                    </p>
                  )}
                  
                  {user.className && (
                    <p className="text-gray-600 flex items-center justify-center gap-1">
                      📚 {user.className}
                    </p>
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Birth Year</span>
                    <span className="font-medium">{user.birthYear || 'Not set'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Profile ID</span>
                    <span className="font-mono text-xs">{user.id.slice(0, 8)}...</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Default Wallet</span>
                    <span className="font-mono text-xs">
                      {user.defaultWallet ? 
                        `${user.defaultWallet.slice(0, 6)}...${user.defaultWallet.slice(-4)}` : 
                        'Not set'
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Completion</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{completionPercentage}%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/profile'}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
                >
                  ✏️ Complete Your Profile
                </button>
              </div>
            </div>

            {/* NFT Certificates */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    🏆 Certificate Gallery ({nftCount})
                  </h2>
                  <button
                    onClick={() => window.location.href = '/profile'}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    🔄 Sync NFTs
                  </button>
                </div>

                {nftCount === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Connect your wallet and sync to discover your NFT certificates from Base Sepolia.
                    </p>
                    <button
                      onClick={() => window.location.href = '/profile'}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      🔄 Sync My Certificates
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Featured Certificate */}
                    {user.userNfts && user.userNfts.length > 0 && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          {user.userNfts[0].nft?.metadataJson?.image ? (
                            <img
                              src={user.userNfts[0].nft.metadataJson.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')}
                              alt="Featured Certificate"
                              className="w-32 h-32 object-cover rounded-lg shadow-lg"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center text-white text-4xl">
                              🏆
                            </div>
                          )}
                          
                          <div className="flex-1 text-center md:text-left">
                            <div className="text-xs text-yellow-600 font-medium mb-1">⭐ FEATURED CERTIFICATE</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                              {user.userNfts[0].nft?.metadataJson?.name || 'Unnamed Certificate'}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {user.userNfts[0].nft?.metadataJson?.description || 'A valuable achievement certificate.'}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded">
                                {user.userNfts[0].nft?.collection?.name || 'Unknown Collection'}
                              </span>
                              <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">
                                #{user.userNfts[0].tokenId}
                              </span>
                              <span className="px-2 py-1 bg-green-200 text-green-800 rounded">
                                {user.userNfts[0].nft?.collection?.standard || 'ERC-721'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Certificate Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {user.userNfts.map((userNft: any, index: number) => (
                        <div key={`${userNft.contractAddress}-${userNft.tokenId}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative">
                            {userNft.nft?.metadataJson?.image ? (
                              <img
                                src={userNft.nft.metadataJson.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')}
                                alt={userNft.nft?.metadataJson?.name || 'Certificate'}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl group-hover:scale-105 transition-transform duration-300">
                                🏆
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              #{userNft.tokenId}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-800 mb-2 truncate">
                              {userNft.nft?.metadataJson?.name || `Certificate #${userNft.tokenId}`}
                            </h4>
                            
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {userNft.nft?.metadataJson?.description || 'A valuable certificate representing achievements.'}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="truncate">
                                {userNft.nft?.collection?.name || 'Unknown'}
                              </span>
                              <span>
                                {new Date(userNft.lastSeenAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {userNft.nft?.collection?.standard || 'ERC-721'}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                Balance: {userNft.balance}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        onClick={() => window.location.href = '/profile'}
                        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                      >
                        🔍 View All Certificates
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="mt-8">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                💼 Connected Wallets ({walletCount})
              </h2>
              
              {walletCount === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💼</div>
                  <p className="text-gray-600">No wallets connected yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.wallets.map((wallet: any, index: number) => (
                    <div key={wallet.address} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            Wallet #{index + 1}
                          </h3>
                          {wallet.ensName && (
                            <p className="text-sm text-blue-600">{wallet.ensName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span className="font-mono text-xs">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Verified:</span>
                          <span className="text-green-600 font-medium">
                            {new Date(wallet.verifiedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 text-center">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={signOut}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  � Sign Out
                </button>
                
                <button
                  onClick={loadUserData}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  � Refresh All Data
                </button>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1 mt-4">
                <p>🌐 Network: Base Sepolia Testnet (84532)</p>
                <p>✅ Authenticated via Sign-In with Ethereum (SIWE)</p>
                <p>📊 API Endpoint: /api/me • Status: ✅ Working</p>
              </div>
            </div>
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