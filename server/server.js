const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const analyticsRoutes = require('./routes/analytics');
const pomodoroRoutes = require('./routes/pomodoro');
const templateRoutes = require('./routes/templates');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/templates', templateRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running!' });
});

// MongoDB connection using fallback approach
const connectToDatabase = async () => {
  try {
    // Try MongoDB Atlas first
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv')) {
      console.log('Attempting MongoDB Atlas connection...');
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsAllowInvalidCertificates: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Connected to MongoDB Atlas successfully');
      return;
    }
  } catch (error) {
    console.log('❌ MongoDB Atlas connection failed');
  }

  try {
    // Try local MongoDB
    console.log('Attempting local MongoDB connection...');
    await mongoose.connect('mongodb://localhost:27017/taskmanager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
    });
    console.log('✅ Connected to local MongoDB successfully');
    return;
  } catch (error) {
    console.log('❌ Local MongoDB not available');
  }

  console.log('⚠️  Running without database connection');
  console.log('📝 API endpoints will return mock data for testing');
};

connectToDatabase();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});