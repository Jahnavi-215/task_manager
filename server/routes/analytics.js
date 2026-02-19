const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get date ranges
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Basic task counts
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ user: userId, status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ user: userId, status: 'In Progress' });
    
    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      user: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: 'Completed' }
    });

    // Tasks by category
    const tasksByCategory = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Weekly completion trend
    const weeklyTrend = await Task.aggregate([
      {
        $match: {
          user: userId,
          status: 'Completed',
          updatedAt: { $gte: startOfWeek }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$updatedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Monthly productivity
    const monthlyStats = await Task.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          created: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0]
            }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Time tracking stats
    const timeStats = await Task.aggregate([
      { $match: { user: userId, actualTime: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalTimeSpent: { $sum: '$actualTime' },
          avgTimePerTask: { $avg: '$actualTime' },
          totalPomodoros: { $sum: '$pomodoroSessions' }
        }
      }
    ]);

    // Productivity score (completed tasks / total tasks * 100)
    const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      message: 'Analytics retrieved successfully',
      analytics: {
        overview: {
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,
          overdueTasks,
          productivityScore
        },
        distribution: {
          byCategory: tasksByCategory,
          byPriority: tasksByPriority
        },
        trends: {
          weekly: weeklyTrend,
          monthly: monthlyStats
        },
        timeTracking: timeStats[0] || {
          totalTimeSpent: 0,
          avgTimePerTask: 0,
          totalPomodoros: 0
        }
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      message: 'Server error retrieving analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/analytics/export
// @desc    Export user data
// @access  Private
router.get('/export', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    const exportData = {
      user: {
        name: req.user.name,
        email: req.user.email
      },
      exportDate: new Date().toISOString(),
      totalTasks: tasks.length,
      tasks: tasks.map(task => ({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        category: task.category,
        tags: task.tags,
        dueDate: task.dueDate,
        estimatedTime: task.estimatedTime,
        actualTime: task.actualTime,
        pomodoroSessions: task.pomodoroSessions,
        subtasks: task.subtasks,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        completionPercentage: task.completionPercentage
      }))
    };

    res.json({
      message: 'Data exported successfully',
      data: exportData
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      message: 'Server error exporting data',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;