# 🚀 Vercel Deployment Checklist

## Pre-Deployment Setup

### ✅ 1. Database Setup
- [ ] PostgreSQL database created (Railway/Supabase/PlanetScale)
- [ ] DATABASE_URL copied and ready
- [ ] Database schema migrated (`prisma migrate deploy`)

### ✅ 2. External Services
- [ ] Alchemy account created
- [ ] Alchemy API key obtained
- [ ] Pinata account created  
- [ ] Pinata JWT token obtained

### ✅ 3. Environment Variables Ready
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-32-char-secret
ALCHEMY_API_KEY=your-alchemy-key
ALCHEMY_NETWORK=base-sepolia
CHAIN_ID=84532
PINATA_JWT=your-pinata-jwt
EDUHUB_CONTRACT=0x62cd4e0C5B0D4587861a21710ed15ba1823a6341
CERT_CONTRACTS=0x53654af9b177adcceeff7c9c10112de21c75fbbd5,0x7eb5ec96b0a1d9d753c68d56a99e241782fde47f,0xc75de08a33d98620d9722acb51f7d1e49660c412
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_APP_NAME=UNI Chain Profile
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Vercel Deployment Steps

### ✅ 1. Connect Repository
- [ ] GitHub repository pushed
- [ ] Vercel account connected to GitHub
- [ ] Import project in Vercel dashboard

### ✅ 2. Project Configuration
```
Framework Preset: Next.js
Root Directory: web
Build Command: npm run build  
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x
```

### ✅ 3. Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

**Production Environment:**
- [ ] DATABASE_URL
- [ ] SESSION_SECRET  
- [ ] ALCHEMY_API_KEY
- [ ] ALCHEMY_NETWORK
- [ ] CHAIN_ID
- [ ] PINATA_JWT
- [ ] EDUHUB_CONTRACT
- [ ] CERT_CONTRACTS
- [ ] NEXT_PUBLIC_CHAIN_ID
- [ ] NEXT_PUBLIC_APP_NAME
- [ ] NEXT_PUBLIC_APP_URL

**Preview Environment:**
- [ ] Same as Production (copy all)

### ✅ 4. Deploy
- [ ] Push to main branch
- [ ] Verify deployment success
- [ ] Check build logs for errors

## Post-Deployment Testing

### ✅ 1. Basic Functionality
- [ ] Homepage loads successfully
- [ ] No JavaScript console errors
- [ ] Responsive design works

### ✅ 2. Authentication Flow
- [ ] Connect wallet button works
- [ ] MetaMask/WalletConnect connection
- [ ] Sign-In with Ethereum (SIWE) works
- [ ] Session persists after refresh

### ✅ 3. Profile System
- [ ] Profile page accessible after login
- [ ] Profile data loads correctly
- [ ] Avatar upload to IPFS works
- [ ] Profile editing and saving works
- [ ] Logout functionality works

### ✅ 4. NFT Certificate System
- [ ] Sync NFT button works
- [ ] Both sync modes (EduHub/Allowlist) work
- [ ] NFT certificates display correctly
- [ ] NFT carousel auto-slides
- [ ] NFT images load from IPFS

### ✅ 5. Database Operations
- [ ] User registration works
- [ ] Profile updates persist
- [ ] NFT data saves to database
- [ ] No database connection errors

## Production Monitoring

### ✅ 1. Performance
- [ ] Page load times < 3 seconds
- [ ] API response times < 1 second
- [ ] IPFS uploads complete successfully
- [ ] NFT sync completes within timeout

### ✅ 2. Error Monitoring
- [ ] Vercel error logs monitored
- [ ] Database performance monitored
- [ ] IPFS gateway uptime monitored
- [ ] Alchemy API rate limits monitored

## Troubleshooting Common Issues

### 🔧 Build Failures
```bash
# Missing Prisma generated client
npm run db:generate

# Database connection issues during build
# Check DATABASE_URL format and accessibility

# Missing environment variables
# Verify all required variables are set in Vercel
```

### 🔧 Runtime Errors
```bash
# SIWE authentication fails
# Check SESSION_SECRET is set
# Verify CHAIN_ID matches wallet network

# NFT sync fails  
# Check ALCHEMY_API_KEY validity
# Verify contract addresses in CERT_CONTRACTS

# IPFS upload fails
# Check PINATA_JWT token validity
# Verify file size limits (2MB max)
```

### 🔧 Performance Issues
```bash
# Slow page loads
# Enable Vercel Analytics
# Check image optimization
# Monitor database query performance

# High API latency
# Check Alchemy API limits
# Monitor IPFS gateway performance
# Optimize database queries
```

## Security Checklist

### ✅ 1. Environment Variables
- [ ] No secrets in client-side code
- [ ] SESSION_SECRET is 32+ characters
- [ ] All API keys properly secured
- [ ] No hardcoded values in code

### ✅ 2. Authentication
- [ ] SIWE message validation works
- [ ] Session cookies are secure
- [ ] User authorization checks work
- [ ] No authentication bypass possible

### ✅ 3. Data Validation
- [ ] All user inputs validated
- [ ] File upload restrictions work
- [ ] Database queries use parameterization
- [ ] Rate limiting implemented

## Success Criteria (DoD)

### ✅ Production URL is live and functional
- [ ] https://your-app.vercel.app loads
- [ ] SSL certificate valid
- [ ] Custom domain configured (optional)

### ✅ Core User Journey Works
1. [ ] User visits homepage
2. [ ] User connects wallet (MetaMask/WalletConnect)
3. [ ] User signs SIWE message
4. [ ] User redirected to profile page
5. [ ] User can edit profile and upload avatar
6. [ ] User can sync NFT certificates
7. [ ] User sees NFT certificates in carousel
8. [ ] User can logout and login again

### ✅ Admin/Developer Features
- [ ] Database migrations work
- [ ] Build process is automated
- [ ] Environment variables properly set
- [ ] Monitoring and logging active
- [ ] Backup and recovery plan ready

---

🎉 **Deployment Complete!** 

Your UNI Chain Profile platform is now live on production!
