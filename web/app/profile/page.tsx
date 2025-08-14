'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Profile {
  id: string;
  displayName: string | null;
  birthYear: number | null;
  school: string | null;
  className: string | null;
  avatarCid: string | null;
  avatarUrl: string | null;
  defaultWallet: string | null;
}

interface NftCertificate {
  id: string;
  chainId: number;
  contractAddress: string;
  tokenId: string;
  balance: string;
  lastSeenAt: string;
  collection: {
    name: string;
    symbol: string;
    standard: string;
  };
  metadata: any;
  metadataUri: string | null;
  name: string;
  description: string;
  image: string;
  imageUrl: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [nfts, setNfts] = useState<NftCertificate[]>([]);
  const [showNfts, setShowNfts] = useState(true); // Show by default
  const [syncMode, setSyncMode] = useState<'eduhub' | 'allowlist'>('allowlist');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    displayName: '',
    birthYear: '',
    school: '',
    className: '',
  });

  useEffect(() => {
    loadProfile();
    loadNFTs();
  }, []);

  // Auto-slide NFT carousel
  useEffect(() => {
    if (nfts.length > 1 && showNfts) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % nfts.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [nfts.length, showNfts]);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          displayName: data.displayName || '',
          birthYear: data.birthYear?.toString() || '',
          school: data.school || '',
          className: data.className || '',
        });
      } else if (response.status === 401) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      showToast('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const loadNFTs = async () => {
    try {
      const response = await fetch('/api/sync-nfts', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setNfts(data.nfts || []);
      } else {
        console.error('Failed to load NFTs');
      }
    } catch (error) {
      console.error('Load NFTs error:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Invalid file type. Please use JPEG, PNG, WebP, or GIF.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast('File too large. Maximum size is 2MB.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/ipfs/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { cid } = await response.json();

        // Update profile with new avatar CID
        await updateProfile({ avatarCid: cid });
        showToast('Avatar uploaded successfully!');
      } else {
        const error = await response.json();
        showToast(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        return true;
      } else {
        const error = await response.json();
        console.error('Profile update failed:', error);
        return false;
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const syncNFTs = async () => {
    setSyncing(true);
    try {
      const response = await fetch(`/api/sync-nfts?mode=${syncMode}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('NFT sync result:', data);
        showToast(`Successfully synced ${data.summary.certifiedNftsFound} certified NFTs!\nMode: ${data.summary.mode}\nScanned: ${data.summary.totalNftsScanned} total NFTs`);
        // Load updated NFTs
        await loadNFTs();
      } else {
        const error = await response.json();
        console.error('NFT sync failed:', error);
        showToast(`NFT sync failed: ${error.error}`);
      }
    } catch (error) {
      console.error('NFT sync error:', error);
      showToast('NFT sync failed. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const updates: any = {};
    if (formData.displayName) updates.displayName = formData.displayName;
    if (formData.birthYear) updates.birthYear = parseInt(formData.birthYear);
    if (formData.school) updates.school = formData.school;
    if (formData.className) updates.className = formData.className;

    const success = await updateProfile(updates);
    if (success) {
      showToast('Profile updated successfully!');
    } else {
      showToast('Failed to update profile. Please try again.');
    }

    setUpdating(false);
  };

  const formatWalletAddress = (address: string | null) => {
    if (!address) return 'Not connected';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  };

  const getEtherscanUrl = (address: string) => {
    return `https://sepolia.etherscan.io/address/${address}`;
  };

  const getAge = (birthYear: number | null) => {
    if (!birthYear) return null;
    return new Date().getFullYear() - birthYear;
  };

  const getInitials = (name: string | null) => {
    if (!name) return '👤';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-xl">ℹ️</div>
            <div className="text-gray-800 text-sm whitespace-pre-line">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative mb-4">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {getInitials(profile?.displayName || null)}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? '⏳' : '📷'}
                  </label>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {profile?.displayName || 'Anonymous User'}
              </h1>
              
              <div className="space-y-2 text-gray-600">
                {profile?.birthYear && (
                  <p className="flex items-center gap-2 justify-center md:justify-start">
                    <span>🎂</span>
                    <span>Age: {getAge(profile.birthYear)} ({profile.birthYear})</span>
                  </p>
                )}
                
                {profile?.school && (
                  <p className="flex items-center gap-2 justify-center md:justify-start">
                    <span>🎓</span>
                    <span>{profile.school}</span>
                  </p>
                )}
                
                {profile?.className && (
                  <p className="flex items-center gap-2 justify-center md:justify-start">
                    <span>📚</span>
                    <span>Class: {profile.className}</span>
                  </p>
                )}
                
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span>👛</span>
                  <span>{formatWalletAddress(profile?.defaultWallet || null)}</span>
                  {profile?.defaultWallet && (
                    <>
                      <button
                        onClick={() => copyToClipboard(profile.defaultWallet!)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        title="Copy address"
                      >
                        📋
                      </button>
                      <a
                        href={getEtherscanUrl(profile.defaultWallet)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        title="View on Etherscan"
                      >
                        🔗
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex gap-3 justify-center md:justify-start">
                <div className="flex flex-col gap-2">
                  <select
                    value={syncMode}
                    onChange={(e) => setSyncMode(e.target.value as 'eduhub' | 'allowlist')}
                    className="px-3 py-1 text-sm border border-gray-300 rounded bg-white"
                  >
                    <option value="allowlist">📋 Contract Allowlist</option>
                    <option value="eduhub">🏫 EduHub Registry</option>
                  </select>
                  <button
                    onClick={syncNFTs}
                    disabled={syncing}
                    className={`px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors text-sm ${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {syncing ? '⏳ Syncing...' : '🔄 Sync Now'}
                  </button>
                </div>
                
                <button
                  onClick={() => setShowNfts(!showNfts)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm"
                >
                  {showNfts ? '🔼 Hide Certificates' : '🔽 Show Certificates'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* NFT Certificates Section */}
        {showNfts && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                🎓 My Certificates ({nfts.length})
              </h2>
              {nfts.length > 0 && (
                <div className="text-sm text-gray-600">
                  Showing {currentSlide + 1} of {nfts.length}
                </div>
              )}
            </div>

            {nfts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Certificates Yet</h3>
                <p className="text-gray-600 mb-6">
                  Click "Sync Now" to fetch your NFT certificates from the blockchain.
                </p>
                <button
                  onClick={syncNFTs}
                  disabled={syncing}
                  className={`px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors ${syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {syncing ? '⏳ Syncing...' : '🔄 Sync My Certificates'}
                </button>
              </div>
            ) : (
              <>
                {/* Featured Certificate Carousel */}
                <div className="relative mb-8">
                  <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {nfts.map((nft, index) => (
                        <div key={nft.id} className="w-full flex-shrink-0">
                          <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                            {/* Certificate Image */}
                            <div className="w-full md:w-1/2">
                              {nft.imageUrl ? (
                                <img
                                  src={nft.imageUrl}
                                  alt={nft.name || 'Certificate'}
                                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                                />
                              ) : (
                                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white text-6xl">
                                  🏆
                                </div>
                              )}
                            </div>

                            {/* Certificate Details */}
                            <div className="w-full md:w-1/2 space-y-4">
                              <h3 className="text-2xl font-bold text-gray-800">
                                {nft.name || `${nft.collection.name} #${nft.tokenId}`}
                              </h3>
                              
                              <p className="text-gray-600 leading-relaxed">
                                {nft.description || 'A valuable certificate representing your achievements.'}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white p-3 rounded-lg shadow">
                                  <div className="font-semibold text-gray-700">Collection</div>
                                  <div className="text-gray-600">{nft.collection.name} ({nft.collection.symbol})</div>
                                </div>

                                <div className="bg-white p-3 rounded-lg shadow">
                                  <div className="font-semibold text-gray-700">Token ID</div>
                                  <div className="text-gray-600">#{nft.tokenId}</div>
                                </div>

                                <div className="bg-white p-3 rounded-lg shadow">
                                  <div className="font-semibold text-gray-700">Contract</div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-600">{formatWalletAddress(nft.contractAddress)}</span>
                                    <button
                                      onClick={() => copyToClipboard(nft.contractAddress)}
                                      className="text-blue-500 hover:text-blue-700"
                                      title="Copy contract address"
                                    >
                                      📋
                                    </button>
                                    <a
                                      href={getEtherscanUrl(nft.contractAddress)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:text-blue-700"
                                      title="View contract on Etherscan"
                                    >
                                      🔗
                                    </a>
                                  </div>
                                </div>

                                <div className="bg-white p-3 rounded-lg shadow">
                                  <div className="font-semibold text-gray-700">Last Updated</div>
                                  <div className="text-gray-600">{new Date(nft.lastSeenAt).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Navigation */}
                  {nfts.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + nfts.length) % nfts.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        ⬅️
                      </button>
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % nfts.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        ➡️
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center mt-6 gap-2">
                        {nfts.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* All Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      {nft.imageUrl ? (
                        <img
                          src={nft.imageUrl}
                          alt={nft.name || 'Certificate'}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                          🏆
                        </div>
                      )}
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 truncate">
                          {nft.name || `${nft.collection.name} #${nft.tokenId}`}
                        </h4>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {nft.description || 'A valuable certificate.'}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{nft.collection.symbol}</span>
                          <span>#{nft.tokenId}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Edit Profile Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ✏️ Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Year
                </label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 2001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School/University
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Đại học Kinh tế TP.HCM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class/Program
                </label>
                <input
                  type="text"
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. K47-QTKD"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {updating ? '⏳ Updating...' : '💾 Save Changes'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                🔙 Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
