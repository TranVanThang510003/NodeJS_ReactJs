# 🎬 Astream – Fullstack Movie App (NodeJS + ReactJS + TypeScript)

Ứng dụng web **Fullstack** hỗ trợ quản lý phim, người dùng, đánh giá và tương tác.  
Dự án được phát triển nhằm thực hành các công nghệ hiện đại trong **Web Development**.

---

# 📂 Cấu trúc dự án  

```
NodeJS_ReactJs/
│── BE/                     # Backend (NodeJS + Express + MongoDB)
│   ├── src/
│   │   ├── routes/         # Định nghĩa API endpoints
│   │   ├── controllers/    # Xử lý logic request/response
│   │   ├── models/         # Mongoose schema & model
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Auth, error handling...
│   └── package.json
│
│── FE/                     # Frontend (React + Redux Toolkit + TS)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Các trang chính
│   │   ├── types/          # TypeScript types
│   │   └── util/           # Axios, helpers
│   └── package.json
│
└── README.md
```

---

## 🛠️ Công nghệ sử dụng  

### Frontend  
- ⚛️ **React 18** – xây dựng giao diện component-based  
- 🎯 **TypeScript** – tăng tính an toàn cho code  
- 🗂 **Redux Toolkit** – quản lý state tập trung  
- 🎨 **Tailwind CSS** – thiết kế UI 
- 🔗 **Axios** – giao tiếp với Backend
### Backend  
- 🟢 **NodeJS + Express** – xây dựng RESTful API  
- 🗄 **MongoDB + Mongoose** – cơ sở dữ liệu NoSQL  
- 🔐 **JWT + bcrypt** – xác thực & bảo mật người dùng  
- ⚡ **Middleware** – xử lý auth, error, logging  

---

## ⚡ Tính năng chính  

### 🔐 Người dùng & Xác thực  
- Đăng ký / Đăng nhập an toàn (JWT, bcrypt)  
- Quản lý hồ sơ cá nhân  
- Middleware bảo vệ API nhạy cảm  

### 🎬 Quản lý phim  
- CRUD phim và tập phim  
- Tìm kiếm, lọc phim theo tên / thể loại  
- Quản lý tập trung qua Admin Dashboard  

### ⭐ Trải nghiệm người dùng  
- Thêm / xóa phim yêu thích (Favorites)  
- Đánh giá phim (Ratings) & tính điểm trung bình  
- Bình luận phim (Comments)  
- Lưu lịch sử xem & tìm kiếm để gợi ý nội dung  

### 🖥️ Giao diện  
- Component-based, dễ mở rộng  
- Responsive UI với **Tailwind CSS**  
- Hỗ trợ trang **Admin** & **User**  

### ☁️ Tích hợp  
- Upload & quản lý ảnh bằng **Cloudinary**  
- Axios Interceptor tự động xử lý token  
- Dev environment: **Vite + ESLint**  

---

## ▶️ Cách chạy dự án  

### 1. Clone repo  
```bash
git clone https://github.com/TranVanThang510003/NodeJS_ReactJs.git
cd NodeJS_ReactJs
```

### 2. Cài dependencies  
**Backend**  
```bash
cd BE
npm install
```

**Frontend**  
```bash
cd FE
npm install
```

### 3. Chạy dự án  
**Backend**  
```bash
npm run dev
# http://localhost:8080
```

**Frontend**  
```bash
npm start
# http://localhost:5173
```
