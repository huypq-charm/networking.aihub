# Hướng Dẫn Deploy Networking App

> **Deploy trên Hostinger?** Xem [DEPLOYMENT_HOSTINGER.md](./DEPLOYMENT_HOSTINGER.md) để có hướng dẫn chi tiết cho Hostinger.

## Tổng Quan

Ứng dụng này bao gồm 2 phần:
1. **Frontend** (React + Vite) - Static files cần được serve
2. **Backend** (Express + MongoDB) - API server cần chạy riêng

## Bước 1: Deploy Backend API

### Yêu cầu:
- Node.js 18+ 
- MongoDB Atlas (đã có sẵn connection string)

### Deploy lên VPS/Server:

1. **Upload code server lên server:**
   ```bash
   # Upload thư mục server/ lên server
   ```

2. **Cài đặt dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Tạo file .env:**
   ```bash
   cp env.example .env
   ```

4. **Cập nhật .env với thông tin production:**
   ```env
   MONGODB_URI=mongodb+srv://huypq_db_user:Pqw0LcyuUBftqcEU@networkingaihub.oneaghs.mongodb.net/?appName=networkingaihub
   PORT=4000
   CORS_ORIGIN=https://your-domain.com,https://www.your-domain.com
   ```

5. **Chạy server với PM2 (khuyến nghị):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name networking-api
   pm2 save
   pm2 startup
   ```

   Hoặc chạy trực tiếp:
   ```bash
   npm start
   ```

6. **Cấu hình Reverse Proxy (Nginx):**
   ```nginx
   server {
       listen 80;
       server_name api.your-domain.com;

       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Bước 2: Deploy Frontend

### Option 1: Deploy Static Files (Netlify, Vercel, GitHub Pages)

1. **Build frontend:**
   ```bash
   # Tạo file .env.production hoặc set environment variable
   VITE_API_URL=https://api.your-domain.com/api npm run build
   ```

2. **Upload thư mục `out/` lên hosting service**

3. **Cấu hình environment variable trên hosting:**
   - Netlify: Site settings > Environment variables > Add variable
     - Key: `VITE_API_URL`
     - Value: `https://api.your-domain.com/api`
   
   - Vercel: Project settings > Environment Variables
     - Key: `VITE_API_URL`
     - Value: `https://api.your-domain.com/api`

### Option 2: Deploy lên VPS với Nginx

1. **Build frontend:**
   ```bash
   # Tạo file .env.production
   echo "VITE_API_URL=https://api.your-domain.com/api" > .env.production
   npm run build
   ```

2. **Upload thư mục `out/` lên server:**
   ```bash
   # Ví dụ: /var/www/networking
   ```

3. **Cấu hình Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       root /var/www/networking/out;
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

4. **Enable HTTPS với Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## Bước 3: Cập nhật CORS trên Backend

Đảm bảo `CORS_ORIGIN` trong `.env` của server bao gồm domain frontend:
```env
CORS_ORIGIN=https://your-domain.com,https://www.your-domain.com
```

## Bước 4: Kiểm Tra

1. **Kiểm tra API:**
   ```bash
   curl https://api.your-domain.com/api/health
   ```

2. **Kiểm tra Frontend:**
   - Mở trình duyệt: `https://your-domain.com`
   - Mở Developer Tools > Network
   - Kiểm tra các API calls đang gọi đúng URL

## Lưu Ý Quan Trọng

1. **Environment Variables:**
   - Frontend: `VITE_API_URL` phải được set khi build (với Vite, biến môi trường được embed vào code khi build)
   - Backend: `.env` file chứa `MONGODB_URI`, `PORT`, `CORS_ORIGIN`

2. **CORS:**
   - Backend phải cho phép domain của frontend
   - Nếu frontend và backend cùng domain (khác subdomain), đảm bảo CORS đúng

3. **MongoDB Atlas:**
   - Đảm bảo MongoDB Atlas cho phép IP của server production
   - Network Access > Add IP Address (hoặc 0.0.0.0/0 để allow all - chỉ cho development)

4. **Security:**
   - KHÔNG commit file `.env` lên git
   - Sử dụng HTTPS cho cả frontend và backend
   - Bảo vệ MongoDB connection string

## Troubleshooting

### Frontend không kết nối được API:
- Kiểm tra `VITE_API_URL` đã được set đúng khi build
- Kiểm tra CORS trên backend
- Kiểm tra Network tab trong browser để xem lỗi cụ thể

### Backend không kết nối được MongoDB:
- Kiểm tra MongoDB Atlas Network Access
- Kiểm tra connection string trong `.env`
- Kiểm tra logs: `pm2 logs networking-api`

### 404 khi refresh trang:
- Đảm bảo Nginx config có `try_files $uri $uri/ /index.html;`
- Hoặc cấu hình redirect tất cả routes về `/index.html`

