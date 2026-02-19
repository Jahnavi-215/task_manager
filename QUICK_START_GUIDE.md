# TaskFlow - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
# Install all dependencies (root, server, and client)
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### Step 2: Configure Environment
```bash
# Server environment
cd server
cp .env.backup .env
# Edit .env with your MongoDB URI and JWT secret

# Client environment (optional)
cd ../client
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

### Step 3: Start MongoDB
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 4: Run the Application
```bash
# From root directory - runs both server and client
npm run dev
```

### Step 5: Access the App
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📝 Key Features to Test

### 1. Authentication
- ✅ Register a new account
- ✅ Login with credentials
- ✅ See success toast notifications
- ✅ Protected routes redirect to login

### 2. Task Management
- ✅ Create a new task
- ✅ Edit existing tasks
- ✅ Delete tasks (with confirmation)
- ✅ Mark tasks as complete
- ✅ Filter by status and priority
- ✅ Search tasks

### 3. User Experience
- ✅ Toast notifications on all actions
- ✅ Empty state when no tasks
- ✅ Loading spinners during operations
- ✅ Page titles update correctly
- ✅ Responsive on mobile

### 4. Settings
- ✅ View profile information
- ✅ Toggle preferences
- ✅ Logout functionality

---

## 🎯 Demo Credentials

If you want to test without creating an account:
```
Email: demo@taskmaster.com
Password: demo123
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not, start it
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm install
cd server && npm install
cd ../client && npm install
```

---

## 📚 Project Structure

```
taskflow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # State management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── styles/        # Global styles
│   └── package.json
│
├── server/                # Express backend
│   ├── middleware/        # Auth middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API endpoints
│   └── server.js         # Entry point
│
└── README.md             # Full documentation
```

---

## 🔑 Key Technologies

- **Frontend**: React 18, React Router v6, Context API
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **Styling**: Custom CSS with modern features

---

## 📖 Next Steps

1. **Explore the Code**: Check out the component structure
2. **Read the README**: Full documentation available
3. **Customize**: Modify colors, add features
4. **Deploy**: Ready for Vercel, Netlify, or Heroku

---

## 💡 Tips

- Use the demo account to test quickly
- Check browser console for any errors
- Toast notifications show feedback for all actions
- All routes except landing/login/register require authentication
- Settings page has functional toggles and logout

---

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `SAAS_ENHANCEMENTS_SUMMARY.md` for feature details
- Open an issue on GitHub
- Check the troubleshooting section above

---

**Happy Task Managing! 🎉**
