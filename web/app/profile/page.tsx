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

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    displayName: '',
    birthYear: '',
    school: '',
    className: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please use JPEG, PNG, WebP, or GIF.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File too large. Maximum size is 2MB.');
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
        alert('Avatar uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
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
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile. Please try again.');
    }

    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              👤 Edit Profile
            </h1>
            <p className="text-gray-600">
              Update your academic profile and avatar
            </p>
          </div>

          {/* Avatar Section */}
          <div className="mb-8 text-center">
            <div className="mb-4">
              {profile?.avatarUrl ? (
                <img 
                  src={profile.avatarUrl} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                  👤
                </div>
              )}
            </div>
            
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
              className={`inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? '⏳ Uploading...' : '📷 Change Avatar'}
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported: JPEG, PNG, WebP, GIF. Max 2MB.
            </p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
                  updating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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

          {/* Current Profile Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Current Profile:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>ID:</strong> {profile?.id}</p>
              <p><strong>Wallet:</strong> {profile?.defaultWallet}</p>
              <p><strong>Avatar CID:</strong> {profile?.avatarCid || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
