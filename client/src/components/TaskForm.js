import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    category: 'Other',
    tags: [],
    dueDate: '',
    estimatedTime: '',
    subtasks: []
  });

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  const categories = [
    { value: 'Work', emoji: '💼', color: '#3498db' },
    { value: 'Personal', emoji: '🏠', color: '#e74c3c' },
    { value: 'Health', emoji: '🏥', color: '#2ecc71' },
    { value: 'Learning', emoji: '📚', color: '#f39c12' },
    { value: 'Finance', emoji: '💰', color: '#9b59b6' },
    { value: 'Shopping', emoji: '🛒', color: '#1abc9c' },
    { value: 'Travel', emoji: '✈️', color: '#34495e' },
    { value: 'Other', emoji: '📋', color: '#95a5a6' }
  ];

  // Populate form if editing existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        category: task.category || 'Other',
        tags: task.tags || [],
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        estimatedTime: task.estimatedTime || '',
        subtasks: task.subtasks || []
      });
    }
  }, [task]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Add subtask
  const addSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, {
          title: newSubtask.trim(),
          completed: false,
          _id: Date.now() // Temporary ID for new subtasks
        }]
      }));
      setNewSubtask('');
    }
  };

  // Remove subtask
  const removeSubtask = (index) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index)
    }));
  };

  // Toggle subtask completion
  const toggleSubtask = (index) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, i) => 
        i === index ? { ...subtask, completed: !subtask.completed } : subtask
      )
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }
    
    if (formData.estimatedTime && (formData.estimatedTime < 1 || formData.estimatedTime > 1440)) {
      newErrors.estimatedTime = 'Estimated time must be between 1 and 1440 minutes';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare data for submission
    const submitData = {
      ...formData,
      dueDate: formData.dueDate || null,
      estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : null
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content enhanced-task-form">
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? '✏️ Edit Task' : '✨ Create New Task'}
          </h2>
          <button onClick={onCancel} className="close-btn">
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">
              <span className="label-icon">📝</span>
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-control ${errors.title ? 'error' : ''}`}
              placeholder="What needs to be done?"
              maxLength={100}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">
              <span className="label-icon">🏷️</span>
              Category
            </label>
            <div className="category-selector">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  className={`category-option ${formData.category === cat.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                  style={{ borderColor: formData.category === cat.value ? cat.color : '#e1e5e9' }}
                >
                  <span className="category-emoji">{cat.emoji}</span>
                  <span className="category-name">{cat.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority and Status */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">
                <span className="label-icon">🎯</span>
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">
                <span className="label-icon">📊</span>
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Pending">📋 Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date and Estimated Time */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">
                <span className="label-icon">📅</span>
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`form-control ${errors.dueDate ? 'error' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="estimatedTime">
                <span className="label-icon">⏱️</span>
                Estimated Time (minutes)
              </label>
              <input
                type="number"
                id="estimatedTime"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                className={`form-control ${errors.estimatedTime ? 'error' : ''}`}
                placeholder="e.g., 60"
                min="1"
                max="1440"
              />
              {errors.estimatedTime && <span className="error-text">{errors.estimatedTime}</span>}
            </div>
          </div>
          
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              <span className="label-icon">📄</span>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'error' : ''}`}
              placeholder="Add more details about this task..."
              rows={4}
              maxLength={500}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <small className="char-count">
              {formData.description.length}/500 characters
            </small>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>
              <span className="label-icon">🏷️</span>
              Tags
            </label>
            <div className="tags-input">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="form-control"
                maxLength={20}
              />
              <button type="button" onClick={addTag} className="btn btn-secondary">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <div className="form-group">
            <label>
              <span className="label-icon">📋</span>
              Subtasks
            </label>
            <div className="subtasks-input">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                placeholder="Add a subtask..."
                className="form-control"
                maxLength={100}
              />
              <button type="button" onClick={addSubtask} className="btn btn-secondary">
                Add
              </button>
            </div>
            <div className="subtasks-list">
              {formData.subtasks.map((subtask, index) => (
                <div key={index} className="subtask-item">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(index)}
                    className="subtask-checkbox"
                  />
                  <span className={`subtask-title ${subtask.completed ? 'completed' : ''}`}>
                    {subtask.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="subtask-remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;