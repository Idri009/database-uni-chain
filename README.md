# 🎓 UNI Chain Profile System

Hệ thống quản lý hồ sơ sinh viên trên UNI Chain với tính năng authentication Web3 và lưu trữ ảnh phi tập trung IPFS.

## 🌟 Tính năng chính

### ✅ Phase 1 - SIWE Authentication
- **Sign-In with Ethereum (SIWE)** 
- **RainbowKit** wallet connection
- **NextAuth.js** session management  
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
