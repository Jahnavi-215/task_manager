# TaskFlow - Modern Task Management Application

<div align="center">
  
  ![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-6366F1?style=for-the-badge&logo=checkmarx&logoColor=white)
  
  **A professional, full-stack task management application built with the MERN stack**
  
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 📋 Overview

TaskFlow is a modern, intuitive task management platform designed to help individuals and teams stay organized and productive. Built with cutting-edge web technologies and featuring a beautiful, responsive UI inspired by leading SaaS products like Trello, Notion, and Linear.

### ✨ Key Features

- **🔐 Secure Authentication** - JWT-based authentication with protected routes
- **📝 Task Management** - Create, edit, delete, and organize tasks with ease
- **🎯 Priority System** - Categorize tasks by priority (High, Medium, Low)
- **📊 Status Tracking** - Track task progress (Pending, In Progress, Completed)
- **📈 Analytics Dashboard** - Visualize productivity metrics and insights
- **🔔 Real-time Notifications** - Toast notifications for user actions
- **🎨 Modern UI/UX** - Clean, professional interface with smooth animations
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **♿ Accessible** - WCAG compliant with keyboard navigation support
- **⚙️ Settings Panel** - Customize preferences and manage account

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router v6** - Client-side routing
- **Context API** - State management
- **CSS3** - Custom styling with modern features
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📸 Screenshots

### Landing Page
Modern, gradient hero section with floating UI elements inspired by Trello's design.

### Authentication
Clean login and registration pages with form validation and password strength indicators.

### Task Dashboard
Professional table layout with KPI stats, filters, and action buttons.

### Analytics
Comprehensive analytics dashboard with productivity insights (Coming Soon).

### Settings
User-friendly settings panel with profile management and preferences.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Install Dependencies

#### Install root dependencies
```bash
npm install
```

#### Install server dependencies
```bash
cd server
npm install
```

#### Install client dependencies
```bash
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment (.env)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Client Environment (.env)
Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start MongoDB
```bash
# Using MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# From root directory - runs both server and client
npm run dev
```

#### Or run separately:

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm start
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

---

## 📁 Project Structure

```
taskflow/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # Context providers
│       ├── hooks/         # Custom hooks
│       ├── pages/         # Page components
│       ├── styles/        # Global styles
│       └── App.js         # Main app component
│
├── server/                # Express backend
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
│
├── README.md             # Project documentation
└── package.json          # Root package file
```

---

## 🎯 Usage Guide

### Creating an Account
1. Navigate to the landing page
2. Click "Sign up" in the navigation
3. Fill in your details (name, email, password)
4. Accept terms and click "Create Account"
5. You'll be redirected to your dashboard

### Managing Tasks
1. Click "New Task" to create a task
2. Fill in task details:
   - Title (required)
   - Description
   - Priority (High/Medium/Low)
   - Status (Pending/In Progress/Completed)
   - Due date
3. Use filters to find specific tasks
4. Click on a task to edit or delete it
5. Check the checkbox to mark as complete

### Viewing Analytics
- Navigate to Analytics from the sidebar
- View productivity metrics and trends
- Filter by time range (Week/Month/Year)

### Customizing Settings
- Go to Settings from the sidebar
- Update your profile information
- Manage notification preferences
- Toggle dark mode (Coming Soon)
- Logout from your account

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Client and server-side protection
- **Input Validation** - Comprehensive form validation
- **XSS Protection** - Sanitized user inputs
- **CORS Configuration** - Controlled cross-origin requests

---

## 🎨 Design System

### Colors
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #8B5CF6 (Purple)
- **Success**: #10B981 (Green)
- **Error**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Background**: #F9FAFB (Light Gray)

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

### Components
- Rounded corners (0.5rem - 1rem)
- Soft shadows for depth
- Smooth transitions (0.15s ease)
- Hover effects for interactivity

---

## 🚧 Roadmap

### Phase 1 (Completed) ✅
- [x] User authentication
- [x] Task CRUD operations
- [x] Modern UI design
- [x] Responsive layout
- [x] Toast notifications
- [x] Settings panel

### Phase 2 (In Progress) 🔄
- [ ] Real analytics with charts
- [ ] Dark mode implementation
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Task comments

### Phase 3 (Planned) 📅
- [ ] Team collaboration
- [ ] Real-time updates (WebSockets)
- [ ] Calendar view
- [ ] Email notifications
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Write clean, readable code

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- Design inspiration from Trello, Notion, and Linear
- Icons from Heroicons
- Fonts from Google Fonts (Inter)
- Community feedback and support

---

## 📞 Support

For support, email support@taskflow.com or open an issue in the GitHub repository.

---

<div align="center">
  
  **Made with ❤️ and ☕**
  
  ⭐ Star this repo if you find it helpful!
  
</div>
