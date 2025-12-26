# Hướng Dẫn Deploy trên Hostinger

## Tổng Quan

Hostinger hỗ trợ nhiều loại hosting. Hướng dẫn này sẽ cover 2 phương án phổ biến:
1. **Shared Hosting (cPanel)** - Cho frontend static files
2. **VPS Hosting** - Cho backend API server

## Phương Án 1: Shared Hosting (cPanel) cho Frontend + VPS cho Backend

### Bước 1: Deploy Backend API lên Hostinger VPS

#### 1.1. Kết nối VPS qua SSH

```bash
# Sử dụng SSH client (PuTTY trên Windows, Terminal trên Mac/Linux)
ssh root@your-vps-ip
# Hoặc
ssh username@your-vps-ip
```

#### 1.2. Cài đặt Node.js trên VPS

```bash
# Cài đặt Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra version
node --version
npm --version
```

#### 1.3. Upload code backend lên VPS

**Cách 1: Sử dụng SCP (từ máy local)**
```bash
# Windows (PowerShell hoặc Git Bash)
scp -r server/ root@your-vps-ip:/var/www/networking-api/

# Linux/Mac
scp -r server/ root@your-vps-ip:/var/www/networking-api/
```

**Cách 2: Sử dụng Git (khuyến nghị)**
```bash
# Trên VPS
cd /var/www
git clone your-repo-url networking-api
cd networking-api/server
```

**Cách 3: Sử dụng FileZilla (SFTP)**
- Kết nối SFTP đến VPS
- Upload thư mục `server/` lên `/var/www/networking-api/`

#### 1.4. Cài đặt và cấu hình Backend

```bash
cd /var/www/networking-api/server

# Cài đặt dependencies
npm install

# Tạo file .env
nano .env
```

**Nội dung file `.env`:**
```env
MONGODB_URI=mongodb+srv://huypq_db_user:Pqw0LcyuUBftqcEU@networkingaihub.oneaghs.mongodb.net/?appName=networkingaihub
PORT=4000
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

**Lưu file:** `Ctrl + X`, sau đó `Y`, sau đó `Enter`

#### 1.5. Cài đặt PM2 để chạy server

```bash
# Cài đặt PM2 globally
npm install -g pm2

# Chạy server với PM2
cd /var/www/networking-api/server
pm2 start server.js --name networking-api

# Lưu cấu hình PM2
pm2 save

# Setup PM2 để tự động khởi động khi server reboot
pm2 startup
# Chạy lệnh mà PM2 hiển thị (thường là sudo ...)
```

#### 1.6. Cấu hình Firewall (nếu cần)

```bash
# Mở port 4000 (hoặc port bạn dùng)
sudo ufw allow 4000/tcp
sudo ufw reload
```

#### 1.7. Cấu hình Nginx Reverse Proxy (khuyến nghị)

```bash
# Cài đặt Nginx
sudo apt update
sudo apt install nginx

# Tạo file config
sudo nano /etc/nginx/sites-available/networking-api
```

**Nội dung file config:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Thay bằng subdomain của bạn

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Kích hoạt config:**
```bash
# Tạo symbolic link
sudo ln -s /etc/nginx/sites-available/networking-api /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 1.8. Cài đặt SSL với Let's Encrypt

```bash
# Cài đặt Certbot
sudo apt install certbot python3-certbot-nginx

# Cài đặt SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Bước 2: Deploy Frontend lên Hostinger Shared Hosting (cPanel)

#### 2.1. Build Frontend với API URL

**Trên máy local của bạn:**
```bash
# Windows (PowerShell)
$env:VITE_API_URL="https://api.yourdomain.com/api"; npm run build

# Windows (CMD)
set VITE_API_URL=https://api.yourdomain.com/api && npm run build

# Linux/Mac
VITE_API_URL=https://api.yourdomain.com/api npm run build
```

Sau khi build, bạn sẽ có thư mục `out/` chứa các file static.

#### 2.2. Upload lên Hostinger qua cPanel

1. **Đăng nhập cPanel:**
   - Truy cập: `https://yourdomain.com:2083` hoặc `https://cpanel.yourdomain.com`
   - Đăng nhập với thông tin Hostinger cung cấp

2. **Mở File Manager:**
   - Tìm và click vào "File Manager"
   - Điều hướng đến thư mục `public_html` (hoặc `www`)

3. **Xóa file mặc định (nếu có):**
   - Xóa file `index.html` mặc định (nếu có)

4. **Upload files:**
   - Click "Upload" button
   - Chọn tất cả files trong thư mục `out/` (sau khi build)
   - Upload lên `public_html`

   **Hoặc sử dụng FTP:**
   - Dùng FileZilla hoặc FTP client khác
   - Kết nối với thông tin FTP từ Hostinger
   - Upload tất cả files từ `out/` lên `public_html`

#### 2.3. Cấu hình .htaccess cho React Router

Tạo file `.htaccess` trong `public_html`:

**Cách 1: Tạo trực tiếp trong cPanel File Manager**
- Click "New File"
- Đặt tên: `.htaccess`
- Click "Edit" và paste nội dung sau:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

**Cách 2: Tạo trên máy local và upload**
- Tạo file `.htaccess` với nội dung trên
- Upload lên `public_html` cùng với các file khác

#### 2.4. Cấu hình Domain và SSL trong cPanel

1. **Kiểm tra Domain:**
   - Vào "Domains" trong cPanel
   - Đảm bảo domain đã được add vào hosting

2. **Cài đặt SSL:**
   - Vào "SSL/TLS Status" hoặc "Let's Encrypt SSL"
   - Chọn domain và click "Run AutoSSL" hoặc "Install"
   - Đợi vài phút để SSL được cài đặt

## Phương Án 2: Tất cả trên VPS Hostinger

Nếu bạn có VPS Hostinger, có thể deploy cả frontend và backend trên cùng VPS:

### Deploy Backend (giống như trên)

### Deploy Frontend trên cùng VPS

#### 1. Build Frontend (trên máy local)
```bash
VITE_API_URL=https://api.yourdomain.com/api npm run build
```

#### 2. Upload lên VPS
```bash
# Sử dụng SCP
scp -r out/* root@your-vps-ip:/var/www/networking-frontend/
```

#### 3. Cấu hình Nginx cho Frontend

```bash
sudo nano /etc/nginx/sites-available/networking-frontend
```

**Nội dung:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/networking-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Kích hoạt:**
```bash
sudo ln -s /etc/nginx/sites-available/networking-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. Cài đặt SSL
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Cấu hình DNS trên Hostinger

### 1. Subdomain cho API (api.yourdomain.com)

1. Đăng nhập Hostinger hPanel
2. Vào "Domains" > "DNS Zone Editor"
3. Thêm A Record:
   - **Type:** A
   - **Name:** api
   - **Points to:** IP của VPS
   - **TTL:** 14400 (hoặc mặc định)

### 2. Domain chính (yourdomain.com)

1. Vào "Domains" > "DNS Zone Editor"
2. Kiểm tra A Record:
   - **Type:** A
   - **Name:** @ (hoặc để trống)
   - **Points to:** IP của shared hosting hoặc VPS
   - **TTL:** 14400

## Kiểm Tra Sau Khi Deploy

### 1. Kiểm tra Backend API
```bash
# Test health endpoint
curl https://api.yourdomain.com/api/health

# Hoặc mở trình duyệt
https://api.yourdomain.com/api/health
```

### 2. Kiểm tra Frontend
- Mở trình duyệt: `https://yourdomain.com`
- Mở Developer Tools (F12) > Network tab
- Kiểm tra các API calls có đúng URL không
- Test login/register

### 3. Kiểm tra MongoDB Connection
- Đảm bảo MongoDB Atlas Network Access đã cho phép IP của VPS
- Kiểm tra logs trên VPS:
  ```bash
  pm2 logs networking-api
  ```

## Troubleshooting

### Frontend không load được
- Kiểm tra `.htaccess` đã được upload chưa
- Kiểm tra file `index.html` có trong `public_html` không
- Kiểm tra quyền truy cập file (chmod 644)

### API không kết nối được
- Kiểm tra PM2 đang chạy: `pm2 list`
- Kiểm tra logs: `pm2 logs networking-api`
- Kiểm tra firewall: `sudo ufw status`
- Kiểm tra Nginx config: `sudo nginx -t`

### CORS Error
- Kiểm tra `CORS_ORIGIN` trong `.env` của backend
- Đảm bảo domain frontend đã được thêm vào
- Restart server: `pm2 restart networking-api`

### SSL không hoạt động
- Đợi vài phút sau khi cài đặt (DNS propagation)
- Kiểm tra DNS đã trỏ đúng chưa
- Test với: `https://www.ssllabs.com/ssltest/`

## Lưu Ý Quan Trọng

1. **Backup trước khi deploy:**
   - Backup database MongoDB
   - Backup code

2. **Security:**
   - Không commit file `.env` lên git
   - Sử dụng strong passwords
   - Cập nhật hệ thống thường xuyên: `sudo apt update && sudo apt upgrade`

3. **Monitoring:**
   - Setup PM2 monitoring: `pm2 monit`
   - Setup log rotation cho PM2
   - Monitor server resources

4. **Performance:**
   - Enable gzip compression trong Nginx
   - Cache static assets
   - Optimize images trước khi upload

## Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs: `pm2 logs networking-api`
2. Kiểm tra Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Kiểm tra cPanel error logs
4. Liên hệ Hostinger support nếu cần

