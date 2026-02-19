const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

// Template Schema
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Template name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Template description cannot exceed 200 characters']
  },
  template: {
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Health', 'Learning', 'Finance', 'Shopping', 'Travel', 'Other'],
      default: 'Other'
    },
    tags: [String],
    estimatedTime: Number,
    subtasks: [{
      title: String,
      completed: { type: Boolean, default: false }
    }]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  usageCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Template = mongoose.model('Template', templateSchema);

// All routes are protected
router.use(auth);

// @route   GET /api/templates
// @desc    Get all templates (user's + public)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userTemplates = await Template.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    const publicTemplates = await Template.find({ 
      isPublic: true, 
      user: { $ne: req.user._id } 
    })
      .populate('user', 'name')
      .sort({ usageCount: -1 })
      .limit(10);

    res.json({
      message: 'Templates retrieved successfully',
      templates: {
        user: userTemplates,
        public: publicTemplates
      }
    });

  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      message: 'Server error retrieving templates',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/templates
// @desc    Create a new template
// @access  Private
router.post('/', async (req, res) => {
  try {
    const template = new Template({
      ...req.body,
      user: req.user._id
    });

    await template.save();

    res.status(201).json({
      message: 'Template created successfully',
      template
    });

  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({
      message: 'Server error creating template',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/templates/:id/use
// @desc    Use a template to create a task
// @access  Private
router.post('/:id/use', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Check if user can access this template
    if (!template.isPublic && template.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Increment usage count
    template.usageCount += 1;
    await template.save();

    // Create task from template
    const Task = require('../models/Task');
    const taskData = {
      ...template.template,
      user: req.user._id,
      ...req.body // Allow overriding template data
    };

    const task = new Task(taskData);
    await task.save();
    await task.populate('user', 'name email');

    res.status(201).json({
      message: 'Task created from template successfully',
      task
    });

  } catch (error) {
    console.error('Use template error:', error);
    res.status(500).json({
      message: 'Server error using template',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   DELETE /api/templates/:id
// @desc    Delete a template
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({
      message: 'Template deleted successfully',
      template
    });

  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({
      message: 'Server error deleting template',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;