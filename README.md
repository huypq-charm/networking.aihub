# Networking App (Vite + MongoDB)

## Getting Started

### Frontend
1. Run `npm install`
2. Copy `.env.example` to `.env.local` và cập nhật `VITE_API_URL` nếu cần
3. Run `npm run dev`

### API (MongoDB)
1. `cd server && npm install`
2. Copy `env.example` to `.env` (MongoDB Atlas connection string is already configured)
3. Optionally update `PORT` or `CORS_ORIGIN` in `.env` if needed
4. Run `npm run dev` inside `server` directory
5. Health check: `GET http://localhost:4000/api/health`

**Note:** The MongoDB Atlas connection string is pre-configured in `env.example`. Just copy it to `.env` and you're ready to go!

## Deployment

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Hướng dẫn deploy tổng quát
- **[DEPLOYMENT_HOSTINGER.md](./DEPLOYMENT_HOSTINGER.md)** - Hướng dẫn deploy trên Hostinger (chi tiết)

### Tóm tắt nhanh:
1. **Build frontend:** `VITE_API_URL=https://api.your-domain.com/api npm run build`
2. **Deploy backend:** Upload `server/` lên server, cài đặt và chạy với PM2
3. **Cập nhật CORS:** Đảm bảo `CORS_ORIGIN` trong backend `.env` bao gồm domain frontend
