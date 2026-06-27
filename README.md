# News Portal

A full-stack news portal website built with React, Tailwind CSS, Zustand, Express.js, and MongoDB.

## Features

- **Home Page** - 5 sections including top 6 news, latest news, category sections, and CTA
- **News Page** - Browse all news with category filtering and pagination
- **News Detail Page** - Full article view with author info and view count
- **Authentication** - User registration and login with JWT
- **Create News** - Registered users can publish news articles
- **User Dashboard** - Profile management and news CRUD operations
- **Contact Us** - Contact form with API integration
- **Header & Footer** - Responsive navigation with category links

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Zustand (state management)
- React Router
- Axios

### Backend
- Express.js (MVC architecture)
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Backend Folder Structure

```
backend/
├── config/           # Database & app configuration
│   └── db.js
├── controllers/      # Route handlers (business logic)
│   ├── authController.js
│   ├── newsController.js
│   ├── userController.js
│   └── contactController.js
├── middleware/       # Auth, validation, error handling
│   ├── auth.js
│   ├── asyncHandler.js
│   ├── errorHandler.js
│   └── validate.js
├── models/           # Mongoose schemas
│   ├── User.js
│   ├── News.js
│   └── Contact.js
├── routes/           # API route definitions
│   ├── index.js
│   ├── authRoutes.js
│   ├── newsRoutes.js
│   ├── userRoutes.js
│   └── contactRoutes.js
├── utils/            # Helper utilities
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── generateToken.js
├── app.js            # Express app setup
├── server.js         # Entry point
└── seed.js           # Sample data seeder
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### News
- `GET /api/news` - Get all news (with pagination & category filter)
- `GET /api/news/top` - Get top 6 news
- `GET /api/news/latest` - Get latest 6 news
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/:id` - Get single news
- `POST /api/news` - Create news (protected)
- `PUT /api/news/:id` - Update news (protected, owner only)
- `DELETE /api/news/:id` - Delete news (protected, owner only)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/my-news` - Get user's news (protected)

### Contact
- `POST /api/contact` - Send contact message
