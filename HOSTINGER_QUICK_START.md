# Quick Start - Deploy trên Hostinger

## Tóm Tắt Nhanh

### 1. Backend API (VPS Hostinger)

```bash
# SSH vào VPS
ssh root@your-vps-ip

# Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Upload code (dùng SCP hoặc Git)
scp -r server/ root@your-vps-ip:/var/www/networking-api/

# Cài đặt
cd /var/www/networking-api/server
npm install

# Tạo .env
nano .env
# Paste:
# MONGODB_URI=mongodb+srv://huypq_db_user:Pqw0LcyuUBftqcEU@networkingaihub.oneaghs.mongodb.net/?appName=networkingaihub
# PORT=4000
# CORS_ORIGIN=https://yourdomain.com

# Cài PM2
npm install -g pm2
pm2 start server.js --name networking-api
pm2 save
pm2 startup

# Cài Nginx
sudo apt install nginx
sudo nano /etc/nginx/sites-available/networking-api
# Paste config (xem DEPLOYMENT_HOSTINGER.md)

# SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### 2. Frontend (Shared Hosting cPanel)

```bash
# Build trên máy local
VITE_API_URL=https://api.yourdomain.com/api npm run build

# Upload thư mục out/ lên public_html qua cPanel File Manager hoặc FTP

# Tạo .htaccess trong public_html (copy từ .htaccess.example)
```

### 3. DNS Configuration

Trong Hostinger hPanel:
- **A Record:** `api` → IP của VPS
- **A Record:** `@` → IP của shared hosting

## Chi Tiết

Xem file **[DEPLOYMENT_HOSTINGER.md](./DEPLOYMENT_HOSTINGER.md)** để có hướng dẫn đầy đủ.

## Checklist

- [ ] Backend đã chạy trên VPS
- [ ] Frontend đã upload lên shared hosting
- [ ] .htaccess đã được tạo
- [ ] DNS đã trỏ đúng
- [ ] SSL đã được cài đặt
- [ ] CORS_ORIGIN đã cập nhật với domain thực tế
- [ ] MongoDB Atlas Network Access đã cho phép IP VPS
- [ ] Test API: `https://api.yourdomain.com/api/health`
- [ ] Test Frontend: `https://yourdomain.com`

