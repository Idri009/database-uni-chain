#!/bin/bash

# 🚀 Vercel Deployment Script for UNI Chain Profile
# This script helps you prepare and deploy your project to Vercel

echo "🎓 UNI Chain Profile - Vercel Deployment Guide"
echo "=================================================="

# Colors for better visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Environment Check
print_step "\n📋 Step 1: Checking Prerequisites"

# Check if Node.js is installed
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    print_success "Node.js is installed: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Git is configured
if git config user.email >/dev/null 2>&1; then
    GIT_EMAIL=$(git config user.email)
    print_success "Git is configured: $GIT_EMAIL"
else
    print_warning "Git user email not configured. Run: git config --global user.email 'your-email@example.com'"
fi

# Step 2: Project Structure Check
print_step "\n📁 Step 2: Checking Project Structure"

if [ -f "web/package.json" ]; then
    print_success "Web package.json found"
else
    print_error "web/package.json not found. Are you in the correct directory?"
    exit 1
fi

if [ -f "web/.env" ]; then
    print_success ".env file found"
else
    print_warning ".env file not found. Copy from .env.example and configure it."
fi

if [ -f "db/prisma/schema.prisma" ]; then
    print_success "Prisma schema found"
else
    print_error "Prisma schema not found at db/prisma/schema.prisma"
    exit 1
fi

# Step 3: Prepare for Deployment
print_step "\n🔧 Step 3: Preparing for Deployment"

echo "Copying Prisma schema to web directory..."
cp -r db/prisma web/
if [ $? -eq 0 ]; then
    print_success "Prisma schema copied successfully"
else
    print_error "Failed to copy Prisma schema"
    exit 1
fi

# Step 4: Test Build
print_step "\n🏗️  Step 4: Testing Production Build"

echo "Running production build test..."
cd web
npm run build
BUILD_EXIT_CODE=$?
cd ..

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    print_success "Production build completed successfully!"
else
    print_error "Production build failed. Please fix the errors above."
    exit 1
fi

# Step 5: Environment Variables Guide
print_step "\n🔑 Step 5: Environment Variables for Vercel"

echo "Copy these environment variables to your Vercel project:"
echo "======================================================="
cat web/.env.example

print_step "\n🌐 Step 6: Vercel Deployment Instructions"

echo "1. Go to https://vercel.com and sign in with GitHub"
echo "2. Click 'New Project' and import your GitHub repository"
echo "3. Configure the following settings:"
echo "   - Framework Preset: Next.js"
echo "   - Root Directory: web"
echo "   - Build Command: npm run build"
echo "   - Output Directory: .next"
echo "   - Install Command: npm install"
echo "   - Node.js Version: 18.x"
echo ""
echo "4. In Environment Variables section, add all variables from above"
echo "5. Deploy!"

print_step "\n📋 Step 7: Post-Deployment Checklist"

echo "After deployment, test these features:"
echo "- ✅ Homepage loads"
echo "- ✅ Connect wallet works"
echo "- ✅ SIWE authentication works"  
echo "- ✅ Profile page accessible"
echo "- ✅ Avatar upload works"
echo "- ✅ NFT sync works"
echo "- ✅ Profile editing works"

print_step "\n🎯 Database Services Recommendations"

echo "Choose one of these managed PostgreSQL services:"
echo ""
echo "🚂 Railway (Recommended):"
echo "   - Visit: https://railway.app"
echo "   - Create PostgreSQL database"
echo "   - Copy DATABASE_URL"
echo ""
echo "🌟 Supabase:"
echo "   - Visit: https://supabase.com"
echo "   - Create new project"
echo "   - Go to Settings > Database"
echo "   - Copy connection string"
echo ""
echo "🪐 PlanetScale:"
echo "   - Visit: https://planetscale.com"
echo "   - Create database"
echo "   - Get connection string"
echo ""
echo "⚡ Neon:"
echo "   - Visit: https://neon.tech"
echo "   - Create PostgreSQL database"
echo "   - Copy connection string"

print_step "\n🔐 Security Reminders"

echo "- ✅ Use strong SESSION_SECRET (32+ characters)"
echo "- ✅ Keep API keys secure"
echo "- ✅ Never commit .env to Git"
echo "- ✅ Use environment-specific variables"
echo "- ✅ Enable Vercel security headers"

print_step "\n🎉 Ready for Deployment!"

print_success "Your project is ready for Vercel deployment!"
print_warning "Don't forget to:"
echo "1. Create managed PostgreSQL database"
echo "2. Set up Vercel environment variables"  
echo "3. Test all functionality after deployment"
echo "4. Monitor logs for any issues"

echo ""
echo "🚀 Happy deploying!"
echo "=================================================="
