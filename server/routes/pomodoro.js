const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   POST /api/pomodoro/start/:taskId
// @desc    Start a pomodoro session for a task
// @access  Private
router.post('/start/:taskId', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Update task status to In Progress if it's Pending
    if (task.status === 'Pending') {
      task.status = 'In Progress';
    }

    await task.save();

    res.json({
      message: 'Pomodoro session started',
      task: {
        _id: task._id,
        title: task.title,
        status: task.status,
        pomodoroSessions: task.pomodoroSessions
      }
    });

  } catch (error) {
    console.error('Start pomodoro error:', error);
    res.status(500).json({
      message: 'Server error starting pomodoro session',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/pomodoro/complete/:taskId
// @desc    Complete a pomodoro session
// @access  Private
router.post('/complete/:taskId', async (req, res) => {
  try {
    const { timeSpent } = req.body; // in minutes

    const task = await Task.findOne({
      _id: req.params.taskId,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Update pomodoro sessions and actual time
    task.pomodoroSessions += 1;
    task.actualTime += timeSpent || 25; // Default 25 minutes

    await task.save();

    res.json({
      message: 'Pomodoro session completed',
      task: {
        _id: task._id,
        title: task.title,
        pomodoroSessions: task.pomodoroSessions,
        actualTime: task.actualTime
      }
    });

  } catch (error) {
    console.error('Complete pomodoro error:', error);
    res.status(500).json({
      message: 'Server error completing pomodoro session',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/pomodoro/stats
// @desc    Get pomodoro statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalPomodoros: { $sum: '$pomodoroSessions' },
          totalTimeSpent: { $sum: '$actualTime' },
          avgPomodorosPerTask: { $avg: '$pomodoroSessions' },
          tasksWithPomodoros: {
            $sum: {
              $cond: [{ $gt: ['$pomodoroSessions', 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    const todayStats = await Task.aggregate([
      {
        $match: {
          user: req.user._id,
          updatedAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      },
      {
        $group: {
          _id: null,
          todayPomodoros: { $sum: '$pomodoroSessions' },
          todayTimeSpent: { $sum: '$actualTime' }
        }
      }
    ]);

    res.json({
      message: 'Pomodoro stats retrieved successfully',
      stats: {
        overall: stats[0] || {
          totalPomodoros: 0,
          totalTimeSpent: 0,
          avgPomodorosPerTask: 0,
          tasksWithPomodoros: 0
        },
        today: todayStats[0] || {
          todayPomodoros: 0,
          todayTimeSpent: 0
        }
      }
    });

  } catch (error) {
    console.error('Pomodoro stats error:', error);
    res.status(500).json({
      message: 'Server error retrieving pomodoro stats',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;