const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'In Progress', 'Completed'],
      message: 'Status must be either Pending, In Progress, or Completed'
    },
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Priority must be either Low, Medium, or High'
    },
    default: 'Medium'
  },
  category: {
    type: String,
    enum: {
      values: ['Work', 'Personal', 'Health', 'Learning', 'Finance', 'Shopping', 'Travel', 'Other'],
      message: 'Category must be one of the predefined categories'
    },
    default: 'Other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }],
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // Allow null/undefined or future dates
        return !value || value >= new Date();
      },
      message: 'Due date cannot be in the past'
    }
  },
  estimatedTime: {
    type: Number, // in minutes
    min: [1, 'Estimated time must be at least 1 minute'],
    max: [1440, 'Estimated time cannot exceed 24 hours']
  },
  actualTime: {
    type: Number, // in minutes
    default: 0
  },
  pomodoroSessions: {
    type: Number,
    default: 0
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: function() { return this.isRecurring; }
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  subtasks: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Subtask title cannot exceed 100 characters']
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must belong to a user']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for better query performance
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ user: 1, category: 1 });
taskSchema.index({ user: 1, tags: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate) return false;
  return this.dueDate < new Date() && this.status !== 'Completed';
});

// Virtual for completion percentage based on subtasks
taskSchema.virtual('completionPercentage').get(function() {
  if (this.subtasks.length === 0) {
    return this.status === 'Completed' ? 100 : 0;
  }
  const completedSubtasks = this.subtasks.filter(subtask => subtask.completed).length;
  return Math.round((completedSubtasks / this.subtasks.length) * 100);
});

// Ensure virtual fields are serialized
taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);