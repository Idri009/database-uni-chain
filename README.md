# 🎓 UNI Chain Profile - Database & NFT Certificates Platform

🎓 A comprehensive platform for managing user profiles and NFT certificates with blockchain integration.

## 🚀 Features

- **SIWE Authentication** - Sign-In with Ethereum
- **Profile Management** - Avatar, personal info with IPFS storage  
- **NFT Certificate Sync** - Fetch and display educational certificates from blockchain
- **Dual Sync Modes** - EduHub registry or allowlist-based filtering
- **Auto Carousel** - Beautiful NFT certificate display
- **Responsive UI** - Modern design with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Next.js 15.4.6, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Ethers.js, wagmi, RainbowKit
- **Storage**: IPFS via Pinata
- **NFT Data**: Alchemy API

## 📋 Environment Variables

### Required for Production

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/dbname"

# Session Management
SESSION_SECRET="your-super-secret-key-minimum-32-characters"

# Blockchain Network
CHAIN_ID=84532
# Base Sepolia = 84532, Ethereum Sepolia = 11155111

# RPC Provider
RPC_URL="https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}"
# For Ethereum Sepolia: https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}

# Alchemy API (for NFT data)
ALCHEMY_API_KEY="your-alchemy-api-key"
ALCHEMY_NETWORK="base-sepolia"
# Options: "base-sepolia", "eth-sepolia"

# IPFS Storage (choose one)
PINATA_JWT="your-pinata-jwt-token"
# OR
WEB3STORAGE_TOKEN="your-web3storage-token"

# NFT Contract Filtering
EDUHUB_CONTRACT="0x62cd4e0C5B0D4587861a21710ed15ba1823a6341"
CERT_CONTRACTS="0x53654af9b177adcceeff7c9c10112de21c75fbbd5,0x7eb5ec96b0a1d9d753c68d56a99e241782fde47f,0xc75de08a33d98620d9722acb51f7d1e49660c412"

# Next.js Public Variables
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_APP_NAME="UNI Chain Profile"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"

# Optional: Cron/Task Security
TASK_SECRET="your-cron-task-secret"

# Development Only
TEST_USER_ADDRESS="0x286db307079C9C92b55D20b33e4eAB6d2A588E54"
```

## 🚀 Deployment Guide

### Prerequisites

1. **Vercel Account** - [vercel.com](https://vercel.com)
2. **PostgreSQL Database** - Managed service (Railway, PlanetScale, Supabase, etc.)
3. **Alchemy Account** - For NFT data API
4. **Pinata Account** - For IPFS storage

### Step 1: Database Setup

1. Create a PostgreSQL database on your preferred provider:
   - **Railway**: [railway.app](https://railway.app) (Recommended)
   - **PlanetScale**: [planetscale.com](https://planetscale.com)
   - **Supabase**: [supabase.com](https://supabase.com)
   - **Neon**: [neon.tech](https://neon.tech)

2. Copy the `DATABASE_URL` connection string

### Step 2: Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Or deploy via GitHub integration
   ```

2. **Project Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. **Environment Variables**
   
   Go to your Vercel project → Settings → Environment Variables:

   ```env
   DATABASE_URL=postgresql://...
   SESSION_SECRET=your-super-secret-key-minimum-32-characters
   ALCHEMY_API_KEY=your-alchemy-api-key
   ALCHEMY_NETWORK=base-sepolia
   CHAIN_ID=84532
   RPC_URL=https://base-sepolia.g.alchemy.com/v2/your-alchemy-api-key
   PINATA_JWT=your-pinata-jwt-token
   EDUHUB_CONTRACT=0x62cd4e0C5B0D4587861a21710ed15ba1823a6341
   CERT_CONTRACTS=0x53654af9b177adcceeff7c9c10112de21c75fbbd5,0x7eb5ec96b0a1d9d753c68d56a99e241782fde47f,0xc75de08a33d98620d9722acb51f7d1e49660c412
   NEXT_PUBLIC_CHAIN_ID=84532
   NEXT_PUBLIC_APP_NAME=UNI Chain Profile
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   ```bash
   git push origin main
   # Vercel will auto-deploy
   ```

### Step 3: Database Migration

After first deployment, run database migration:

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.local
npm run db:migrate

# Option 2: Via Vercel Functions (add build hook)
# Will run automatically during build
```

### Step 4: Verify Deployment

Test these features:
- ✅ Homepage loads
- ✅ Connect wallet (MetaMask, etc.)
- ✅ Sign-In with Ethereum (SIWE)
- ✅ Profile page accessible
- ✅ Avatar upload works
- ✅ NFT certificate sync works
- ✅ Profile editing and saving

## 🔧 Development Setup

```bash
# Clone repository
git clone https://github.com/Hpgbao2204/database-uni-chain.git
cd database-uni-chain

# Install dependencies
npm install

# Setup environment
cp web/.env.example web/.env
# Edit .env with your values

# Run database migration
cd web && npm run db:push

# Start development server
npm run dev
```

## 📁 Project Structure

```
database-uni-chain/
├── web/                        # Next.js application
│   ├── app/                    # App router
│   │   ├── api/               # API routes
│   │   ├── profile/           # Profile page
│   │   └── page.tsx           # Homepage
│   ├── lib/                   # Utilities
│   ├── prisma/                # Database schema
│   └── public/                # Static files
├── scripts/                   # Utility scripts
├── readEduNFTScript.ts        # EduHub NFT reader
├── readCertNFTScript.ts       # Allowlist NFT reader
└── README.md
```

## 🔗 API Endpoints

- `GET /api/me` - Get current user session
- `GET /api/nonce` - Get SIWE nonce
- `POST /api/verify` - Verify SIWE signature  
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Update user profile
- `POST /api/ipfs/upload` - Upload file to IPFS
- `GET /api/sync-nfts` - Get stored NFT certificates
- `POST /api/sync-nfts` - Sync NFTs from blockchain

## 🎯 NFT Certificate Sync

Two modes available:

### EduHub Registry Mode
```bash
POST /api/sync-nfts?mode=eduhub
```
Filters NFTs using EduHub contract's `isEduNFT()` function.

### Allowlist Mode  
```bash
POST /api/sync-nfts?mode=allowlist
```
Filters NFTs using predefined contract allowlist.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify `DATABASE_URL` format
   - Check database server status
   - Ensure database exists

2. **SIWE Authentication Fails**
   - Check `SESSION_SECRET` is set
   - Verify wallet network matches `CHAIN_ID`
   - Clear browser cookies/localStorage

3. **NFT Sync Not Working**
   - Verify `ALCHEMY_API_KEY` is valid
   - Check contract addresses in `CERT_CONTRACTS`
   - Ensure target address has NFTs

4. **IPFS Upload Fails**
   - Check `PINATA_JWT` token validity
   - Verify file size limits (2MB max)
   - Check file type restrictions

### Production Debugging

```bash
# Check Vercel logs
vercel logs

# Database status
npm run db:studio

# Test NFT scripts locally
npm run nft:cert [address]
```

## 🔐 Security Considerations

- ✅ Environment variables never exposed to client
- ✅ Session secrets properly configured
- ✅ SIWE message validation
- ✅ File upload size/type restrictions
- ✅ Database input sanitization

## 📊 Monitoring

Monitor these metrics in production:
- Database connection health
- API response times
- IPFS upload success rates
- NFT sync success rates
- User authentication flows

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@example.com]

---

Built with ❤️ for the blockchain education community  
- **PostgreSQL + Prisma** database
- **Base Sepolia** testnet support

### ✅ Phase 2 - IPFS Profile System
- **Pinata IPFS** upload ảnh avatar
- **Profile Management APIs** (GET/POST)
- **File Validation** (2MB limit, image types)
- **IPFS Gateway** display images
- **Zod Schema Validation**

### 🔄 Phase 3 - Roadmap
- **NFT Certificate** sync từ Base Sepolia
- **Advanced Profile** fields (skills, achievements)
- **Profile Sharing** & export features

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **RainbowKit** + **Wagmi**
- **React Hook Form** + **Zod**

### Backend  
- **Next.js API Routes**
- **NextAuth.js** (SIWE adapter)
- **Prisma ORM**
- **PostgreSQL**
- **Pinata IPFS API**

### Web3
- **Ethereum** wallet support
- **Base Sepolia** testnet
- **SIWE** authentication
- **IPFS** decentralized storage

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repo-url>
cd database-uni-chain
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Environment
```bash
# Copy environment files
cp web/.env.example web/.env

# Update với credentials của bạn:
# - Database URL (PostgreSQL)
# - NextAuth Secret
# - Pinata JWT Token
```

### 4. Database Setup
```bash
cd web
pnpm db:push    # Tạo database schema
```

### 5. Start Development
```bash
pnpm dev        # Start Next.js server
```

Visit: http://localhost:3000

## 📁 Project Structure

```
database-uni-chain/
├── web/                    # Next.js application
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/       # NextAuth.js routes
│   │   │   ├── ipfs/       # IPFS upload API
│   │   │   └── profile/    # Profile management
│   │   ├── profile/        # Profile editing page
│   │   └── page.tsx        # Main dashboard
│   ├── lib/
│   │   ├── auth.ts         # NextAuth config
│   │   ├── db.ts          # Prisma client  
│   │   └── wagmi.ts       # Wagmi config
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── components/         # React components
├── contracts/              # Smart contracts (future)
├── scripts/               # Deployment scripts
└── docs/                  # Documentation
```

## 🔧 API Endpoints

### Authentication
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signin` - SIWE login

### Profile Management  
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Update profile

### IPFS Upload
- `POST /api/ipfs/upload` - Upload image to IPFS

## 🎯 Usage Guide

### 1. Connect Wallet
- Click **Connect Wallet**
- Chọn wallet (MetaMask, Coinbase, etc.)
- Switch to **Base Sepolia** network

### 2. Authenticate
- Click **Sign-In with Ethereum** 
- Sign message trong wallet
- Session sẽ được tạo

### 3. Edit Profile
- Click **Edit Profile**
- Upload avatar image (≤2MB)
- Điền thông tin: name, bio, email
- Click **Save Profile**

### 4. View Profile
- Avatar hiển thị từ IPFS gateway
- Profile data được lưu trong database
- Share profile link với others

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Pinata IPFS
PINATA_JWT="eyJhbGciOiJIUzI1NiIs..."
```

👉 **Chi tiết setup**: Xem [PINATA_SETUP.md](./PINATA_SETUP.md)

## 🧪 Testing

### Manual Testing
1. Start server: `pnpm dev`
2. Connect wallet + authenticate
3. Test profile upload & editing
4. Verify IPFS image display

### API Testing
```bash
# Test profile API
curl -X GET http://localhost:3000/api/profile

# Test IPFS upload (with auth)
curl -X POST http://localhost:3000/api/ipfs/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@avatar.jpg"
```

## 🐛 Troubleshooting

### Common Issues

**"PINATA_JWT not configured"**
- Setup Pinata API key theo [hướng dẫn](./PINATA_SETUP.md)

**"Wallet connection failed"**  
- Switch to Base Sepolia testnet
- Add network manually nếu cần

**"Database connection error"**
- Kiểm tra PostgreSQL running
- Verify DATABASE_URL correct

**"Image upload failed"**
- File size ≤2MB
- Supported formats: JPEG, PNG, WebP, GIF

## 🔮 Roadmap

### Phase 3 - NFT Integration
- [ ] Sync NFT certificates từ Base Sepolia
- [ ] Display achievements & credentials  
- [ ] Verify blockchain ownership

### Phase 4 - Advanced Features
- [ ] Skill verification system
- [ ] Profile templates & themes
- [ ] Export profile as PDF/JSON
- [ ] Social sharing features

### Phase 5 - Production
- [ ] Mainnet deployment
- [ ] Performance optimization
- [ ] Security audit
- [ ] Mobile app support

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes & test
4. Submit pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

## 📞 Support

- **Issues**: GitHub Issues
- **Discord**: [UNI Chain Community]
- **Email**: support@unichain.dev

---

**Built with ❤️ for UNI Chain community**
