# Supabase Setup Guide

## 1. Lấy Database Password

1. Vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Vào **Settings** → **Database**
4. Scroll xuống section **Connection pooling**
5. Copy password và thay thế `[YOUR_PASSWORD]` trong `.env`

## 2. Connection String Đã Được Cập Nhật

```env
# Transaction Pooler (Khuyến nghị cho Vercel)
DATABASE_URL="postgresql://postgres.selrdmfkxhwvfrntovnk:[YOUR_PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

## 3. So Sánh 3 Options

### Direct Connection (Port 5432)
```
psql -h db.selrdmfkxhwvfrntovnk.supabase.co -p 5432 -d postgres -U postgres
```
- ❌ Không pooling → dễ bị connection limit
- ❌ Serverless không phù hợp
- ✅ Phù hợp cho desktop apps

### Transaction Pooler (Port 6543) - **KHUYẾN NGHỊ**
```
psql -h aws-1-ap-southeast-1.pooler.supabase.com -p 6543 -d postgres -U postgres.selrdmfkxhwvfrntovnk
```
- ✅ PgBouncer transaction mode
- ✅ Tối ưu cho Next.js serverless
- ✅ Hỗ trợ prepared statements
- ✅ Phù hợp với Prisma transactions

### Session Pooler (Port 5432)
```
psql -h aws-1-ap-southeast-1.pooler.supabase.com -p 5432 -d postgres -U postgres.selrdmfkxhwvfrntovnk
```
- ⚠️ Session mode → giữ connection lâu
- ❌ Không tối ưu cho serverless
- ✅ Phù hợp cho long-running apps

## 4. Test Connection

Sau khi cập nhật password:

```bash
# Test migration
npm run db:push

# Test local dev
npm run dev
```

## 5. Production Setup

### Vercel Environment Variables:
```
DATABASE_URL=postgresql://postgres.selrdmfkxhwvfrntovnk:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
ALCHEMY_API_KEY=vmbHGNAV4NKw9V2tleUXODo4NDDUQpiy
ALCHEMY_NETWORK=base-sepolia
EDUHUB_CONTRACT=0x62cd4e0C5B0D4587861a21710ed15ba1823a6341
CERT_CONTRACTS=0x53654af9b177adcceeff7c9c10112de21c75fbbd5,0x7eb5ec96b0a1d9d753c68d56a99e241782fde47f,0xc75de08a33d98620d9722acb51f7d1e49660c412,0xcf11237e021c38cecacc7da4211a808fe898feee
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_APP_NAME=UNI Chain Profile
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
SESSION_SECRET=your-super-secret-key-change-this-in-production-minimum-32-characters-uni-chain-profile-2025
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 6. Why Transaction Pooler?

### Your App Pattern:
- **SIWE Login**: Quick transaction để tạo user/wallet
- **Profile Updates**: Single transaction operations  
- **NFT Sync**: Batch upserts trong transaction
- **API Routes**: Short-lived serverless functions

### Transaction Pooler Benefits:
- **Connection Reuse**: Giảm connection overhead
- **Transaction Mode**: Mỗi SQL transaction = 1 pooled connection
- **Prisma Compatible**: Hỗ trợ prepared statements và transactions
- **Cost Effective**: Tránh connection limit trên free tier

### Performance:
```
Direct Connect:     ~100ms latency
Transaction Pool:   ~50ms latency  ✅
Session Pool:       ~30ms latency (nhưng giữ connection lâu)
```

Với Next.js serverless, Transaction Pooler là sweet spot giữa performance và resource efficiency!
