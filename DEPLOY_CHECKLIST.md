# Deployment Checklist

## ✅ Các thay đổi cần thiết khi deploy với API + MongoDB

### 1. Backend (Server)

- [x] **File `.env` trong thư mục `server/`:**
  ```env
  MONGODB_URI=mongodb+srv://huypq_db_user:Pqw0LcyuUBftqcEU@networkingaihub.oneaghs.mongodb.net/?appName=networkingaihub
  PORT=4000
  CORS_ORIGIN=https://your-domain.com,https://www.your-domain.com
  ```
  ⚠️ **QUAN TRỌNG:** Thay `your-domain.com` bằng domain thực tế của bạn

- [x] **MongoDB Atlas Network Access:**
  - Đăng nhập MongoDB Atlas
  - Network Access > Add IP Address
  - Thêm IP của server production (hoặc 0.0.0.0/0 cho development)

### 2. Frontend Build

- [x] **Set environment variable khi build:**
  ```bash
  # Windows (PowerShell)
  $env:VITE_API_URL="https://api.your-domain.com/api"; npm run build

  # Windows (CMD)
  set VITE_API_URL=https://api.your-domain.com/api && npm run build

  # Linux/Mac
  VITE_API_URL=https://api.your-domain.com/api npm run build
  ```

  ⚠️ **QUAN TRỌNG:** 
  - Thay `api.your-domain.com` bằng domain API thực tế
  - Vite embed biến môi trường vào code khi BUILD, không phải runtime
  - Phải rebuild nếu thay đổi `VITE_API_URL`

### 3. Files đã được tạo/cập nhật

- [x] `DEPLOYMENT.md` - Hướng dẫn chi tiết deployment
- [x] `.env.example` - Template cho frontend env variables (nếu cần)
- [x] `server/.gitignore` - Ignore file .env
- [x] `.gitignore` - Updated với các file cần ignore
- [x] `vite.config.ts` - Optimized cho production build
- [x] `README.md` - Thêm link đến DEPLOYMENT.md

### 4. Checklist trước khi deploy

#### Backend:
- [ ] Đã tạo file `server/.env` với đúng thông tin
- [ ] Đã test kết nối MongoDB từ server production
- [ ] Đã cập nhật `CORS_ORIGIN` với domain frontend
- [ ] Đã cài đặt dependencies: `cd server && npm install`
- [ ] Đã test chạy server: `npm start`
- [ ] Đã setup PM2 hoặc process manager khác

#### Frontend:
- [ ] Đã set `VITE_API_URL` đúng khi build
- [ ] Đã chạy `npm run build` thành công
- [ ] Đã test build local: `npm run preview`
- [ ] Đã upload thư mục `out/` lên hosting
- [ ] Đã cấu hình routing (nếu cần) - redirect về `/index.html`

### 5. Sau khi deploy

- [ ] Test API endpoint: `https://api.your-domain.com/api/health`
- [ ] Test frontend: Mở trình duyệt và kiểm tra
- [ ] Test login/register
- [ ] Kiểm tra Network tab trong DevTools xem API calls có đúng URL không
- [ ] Test tất cả các chức năng chính

### 6. Lưu ý quan trọng

1. **Environment Variables:**
   - Frontend: `VITE_API_URL` phải set khi BUILD (không phải runtime)
   - Backend: `.env` file phải có trên server

2. **CORS:**
   - Backend phải cho phép domain frontend trong `CORS_ORIGIN`
   - Format: `https://domain1.com,https://domain2.com` (không có space sau dấu phẩy)

3. **HTTPS:**
   - Khuyến nghị sử dụng HTTPS cho cả frontend và backend
   - Có thể dùng Let's Encrypt (miễn phí)

4. **Security:**
   - KHÔNG commit file `.env` lên git
   - Bảo vệ MongoDB connection string
   - Sử dụng strong passwords

5. **Build Process:**
   - Mỗi lần thay đổi `VITE_API_URL`, phải rebuild lại frontend
   - Code đã được build sẽ không tự động cập nhật env variables

### 7. Common Issues

**Frontend không kết nối được API:**
- Kiểm tra `VITE_API_URL` đã được set đúng khi build
- Kiểm tra CORS trên backend
- Kiểm tra Network tab trong browser

**404 khi refresh trang:**
- Đảm bảo server config có redirect về `/index.html`
- Với Nginx: `try_files $uri $uri/ /index.html;`

**MongoDB connection failed:**
- Kiểm tra MongoDB Atlas Network Access
- Kiểm tra connection string trong `.env`
- Kiểm tra logs: `pm2 logs networking-api`

