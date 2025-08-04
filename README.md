# LinkedIn Clone

A full-stack social media application built with MERN stack that replicates core LinkedIn functionality.

## 🚀 Live Demo

**Live Demo URL:** [Add your deployed app URL here]

**GitHub Repository:** [Add your GitHub repo URL here]

## 🛠️ Tech Stack

### Frontend
- **React.js** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## ✨ Features

### 1. User Authentication
- ✅ User registration with email, username, name, and password
- ✅ User login with username/password
- ✅ JWT-based authentication
- ✅ Protected routes for authenticated users
- ✅ Automatic logout on token expiration

### 2. User Profile Management
- ✅ View personal profile with name, email, username, and bio
- ✅ Edit profile information (name and bio)
- ✅ View other users' public profiles
- ✅ Display user's post count and post history

### 3. Public Post Feed
- ✅ Create text-based posts
- ✅ View all posts in chronological order (newest first)
- ✅ Display post author name and timestamp
- ✅ Clickable author names that redirect to their profiles

### 4. Social Features
- ✅ Browse other users' profiles and posts
- ✅ Interactive navigation between user profiles
- ✅ Responsive design for all screen sizes

### 5. Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected API endpoints
- ✅ Input validation and error handling

## 📁 Project Structure

```
linkedin-clone/
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── profile.controller.js
│   │   ├── middleware/
│   │   │   └── verifyToken.js
│   │   ├── models/
│   │   │   ├── post.models.js
│   │   │   └── users.models.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── profile.routes.js
│   │   └── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Auth.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Feed/
│   │   │   │   └── Feed.jsx
│   │   │   ├── Home/
│   │   │   │   └── Home.jsx
│   │   │   └── Profile/
│   │   │       ├── Profile.jsx
│   │   │       └── UserProfile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd linkedin-clone/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   JWT_SECRET="your_jwt_secret_key_here_make_it_long_and_secure"
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - The app connects to `mongodb://127.0.0.1:27017/linkedin` by default
   - Update the connection string in `app.js` if needed

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login

### Post Routes (`/api/posts`)
- `GET /getpost` - Get all posts (public)
- `POST /save` - Create new post (protected)

### User/Profile Routes (`/api/user`)
- `GET /profile` - Get current user's profile (protected)
- `GET /profile/:userId` - Get user's public profile
- `PUT /profile` - Update current user's profile (protected)

## 🔐 Authentication Flow

1. User registers with email, username, name, and password
2. Password is hashed using bcrypt before storing
3. User logs in with username and password
4. JWT token is generated and sent to client
5. Client stores token in localStorage
6. Token is sent in Authorization header for protected routes
7. Middleware verifies token for protected endpoints

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Navigation** - Smooth routing between pages
- **Loading States** - User feedback during API calls
- **Error Handling** - Proper error messages for failed operations
- **Form Validation** - Client and server-side validation
- **Hover Effects** - Enhanced user interaction

## 🚀 Deployment

### Backend Deployment
1. Choose a platform (Heroku, Railway, DigitalOcean, etc.)
2. Set environment variables
3. Update database connection string
4. Deploy the backend code

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URLs in the frontend code

### Database Deployment
- Use MongoDB Atlas for cloud database
- Update connection string in backend

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3000
JWT_SECRET="your_secure_jwt_secret_key"
```

## 🎯 Future Enhancements

- [ ] Like/Unlike posts
- [ ] Comment system
- [ ] Image upload for posts and profiles
- [ ] Real-time notifications
- [ ] Connection/Follow system
- [ ] Search functionality
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Rich text editor for posts
- [ ] Post deletion and editing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Your Name**
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

---

**Note:** This is a demo project built for learning purposes. It implements core social media functionality similar to LinkedIn.
