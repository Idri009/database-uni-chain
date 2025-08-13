import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

// File validation
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

async function uploadToPinata(file: File): Promise<string> {
  const PINATA_JWT = process.env.PINATA_JWT;
  
  if (!PINATA_JWT) {
    throw new Error('PINATA_JWT not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('pinataMetadata', JSON.stringify({
    name: `avatar-${file.name}`,
    keyvalues: {
      type: 'avatar',
      uploadedAt: new Date().toISOString(),
    }
  }));

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinata upload failed: ${error}`);
  }

  const result = await response.json();
  return result.IpfsHash;
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ 
        error: 'No file provided' 
      }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Supported formats: JPEG, PNG, WebP, GIF' 
      }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 2MB' 
      }, { status: 400 });
    }

    // Upload to Pinata
    const cid = await uploadToPinata(file);
    
    console.log('🖼️ Image uploaded to IPFS:', cid);

    return NextResponse.json({ 
      cid,
      url: `https://ipfs.io/ipfs/${cid}`,
      gateway: `https://gateway.pinata.cloud/ipfs/${cid}`,
    });

  } catch (error) {
    console.error('IPFS upload error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('too large')) {
        return NextResponse.json({ error: 'File too large' }, { status: 400 });
      }
      if (error.message.includes('Invalid file type')) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }
      if (error.message.includes('PINATA_JWT not configured')) {
        return NextResponse.json({ error: 'IPFS service not configured' }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
