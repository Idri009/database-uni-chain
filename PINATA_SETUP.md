# IPFS Upload Setup với Pinata

## 📋 Hướng dẫn setup Pinata JWT Token

### 1. Tạo tài khoản Pinata
- Truy cập: https://app.pinata.cloud/
- Đăng ký tài khoản miễn phí
- Verify email

### 2. Tạo API Key
- Vào **Developers** → **API Keys**
- Click **New Key**
- **Permissions**: Chọn:
  - ✅ **pinFileToIPFS**
  - ✅ **pinJSONToIPFS** 
  - ✅ **unpin**
- **Key Name**: `UNI Chain Profile Upload`
- Click **Create Key**

### 3. Copy JWT Token
- Sau khi tạo, copy **JWT Token** (bắt đầu với `eyJ...`)
- ⚠️ **Chú ý**: Token này chỉ hiển thị 1 lần!

### 4. Cập nhật .env
```bash
# Thêm vào file /web/.env
PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3..."
```

### 5. Test Upload
- Khởi động server: `pnpm dev`
- Đăng nhập SIWE
- Vào **Edit Profile** 
- Thử upload ảnh avatar

## 🔍 Debug Common Issues

### Error: "PINATA_JWT not configured"
- Kiểm tra file `.env` có `PINATA_JWT=...`
- Restart server sau khi update .env

### Error: "Upload failed: Unauthorized"  
- JWT token sai hoặc hết hạn
- Tạo lại API key trên Pinata

### Error: "File too large"
- File > 2MB
- Resize ảnh hoặc compress trước khi upload

### Error: "Invalid file type"
- Chỉ support: JPEG, PNG, WebP, GIF
- Convert file về định dạng hỗ trợ

## 🌐 IPFS Gateways

Upload thành công sẽ trả về:
```json
{
  "cid": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  "url": "https://ipfs.io/ipfs/QmYwA...",
  "gateway": "https://gateway.pinata.cloud/ipfs/QmYwA..."
}
```

**Gateway alternatives:**
- `https://ipfs.io/ipfs/{cid}`
- `https://gateway.pinata.cloud/ipfs/{cid}`
- `https://cloudflare-ipfs.com/ipfs/{cid}`

## 📊 Pinata Free Plan Limits
- **Storage**: 1GB
- **Bandwidth**: 100GB/month  
- **Requests**: 100 requests/month
- ✅ Đủ cho development và testing!
