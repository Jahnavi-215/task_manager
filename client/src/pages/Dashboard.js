import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import PomodoroTimer from '../components/PomodoroTimer';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    clearError 
  } = useTask();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('tasks'); // 'tasks' or 'analytics'
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroTask, setPomodoroTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    sortBy: 'createdAt',
    order: 'desc'
  });

  // Fetch tasks on component mount and when filters change
  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'Pending').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    overdue: tasks.filter(task => {
      if (!task.dueDate || task.status === 'Completed') return false;
      return new Date(task.dueDate) < new Date();
    }).length,
    byCategory: tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {}),
    totalTimeSpent: tasks.reduce((acc, task) => acc + (task.actualTime || 0), 0),
    totalPomodoros: tasks.reduce((acc, task) => acc + (task.pomodoroSessions || 0), 0)
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle create task
  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      await deleteTask(taskId);
    }
  };

  // Handle task form submission
  const handleTaskSubmit = async (taskData) => {
    let result;
    
    if (editingTask) {
      result = await updateTask(editingTask._id, taskData);
    } else {
      result = await createTask(taskData);
    }
    
    if (result.success) {
      setShowTaskForm(false);
      setEditingTask(null);
    }
  };

  // Handle task form cancel
  const handleTaskCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Handle Pomodoro timer
  const handleStartPomodoro = (task) => {
    setPomodoroTask(task);
    setShowPomodoro(true);
  };

  const handlePomodoroComplete = () => {
    // Refresh tasks to show updated pomodoro count
    fetchTasks(filters);
  };

  // Handle task selection for bulk operations
  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Handle bulk operations
  const handleBulkStatusChange = async (newStatus) => {
    for (const taskId of selectedTasks) {
      const task = tasks.find(t => t._id === taskId);
      if (task) {
        await updateTask(taskId, { ...task, status: newStatus });
      }
    }
    setSelectedTasks([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} tasks?`)) {
      for (const taskId of selectedTasks) {
        await deleteTask(taskId);
      }
      setSelectedTasks([]);
      setShowBulkActions(false);
    }
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format time
  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="dashboard-subtitle">
              Here's your productivity overview
            </p>
          </div>
          <div className="dashboard-actions">
            <button 
              onClick={() => setActiveView(activeView === 'tasks' ? 'analytics' : 'tasks')}
              className="btn btn-secondary"
            >
              {activeView === 'tasks' ? 'Analytics' : 'Tasks'}
            </button>
            <button 
              onClick={handleCreateTask}
              className="btn btn-primary"
            >
              Add Task
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <strong>Oops!</strong> {error}
          </div>
        )}

        {activeView === 'analytics' ? (
          <AnalyticsDashboard />
        ) : (
          <>
            {/* Enhanced Task Statistics */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">{taskStats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{taskStats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{taskStats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{taskStats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{formatTime(taskStats.totalTimeSpent)}</div>
                <div className="stat-label">Time Spent</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{taskStats.totalPomodoros}</div>
                <div className="stat-label">🍅 Pomodoros</div>
              </div>
              {taskStats.overdue > 0 && (
                <div className="stat-card">
                  <div className="stat-number" style={{ color: '#e74c3c' }}>
                    {taskStats.overdue}
                  </div>
                  <div className="stat-label">Overdue</div>
                </div>
              )}
            </div>

            {/* Enhanced Search and Filters */}
            <div className="task-filters">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input form-control"
                />
              </div>
              
              <div className="filters-row">
                <div className="filter-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Learning">Learning</option>
                    <option value="Finance">Finance</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="sortBy">Sort by</label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="createdAt">Date Created</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                    <option value="title">Title</option>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedTasks.length > 0 && (
                <div className="bulk-actions">
                  <span className="bulk-count">
                    {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
                  </span>
                  <div className="bulk-buttons">
                    <button 
                      onClick={() => handleBulkStatusChange('Pending')}
                      className="btn btn-secondary btn-sm"
                    >
                      Mark Pending
                    </button>
                    <button 
                      onClick={() => handleBulkStatusChange('In Progress')}
                      className="btn btn-secondary btn-sm"
                    >
                      Mark In Progress
                    </button>
                    <button 
                      onClick={() => handleBulkStatusChange('Completed')}
                      className="btn btn-success btn-sm"
                    >
                      Mark Completed
                    </button>
                    <button 
                      onClick={handleBulkDelete}
                      className="btn btn-secondary btn-sm text-danger"
                    >
                      Delete Selected
                    </button>
                    <button 
                      onClick={() => setSelectedTasks([])}
                      className="btn btn-ghost btn-sm"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Task List */}
            {loading ? (
              <div className="loading">Loading your awesome tasks...</div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {searchTerm ? '🔍' : '📝'}
                </div>
                <h3>
                  {searchTerm 
                    ? `No tasks found for "${searchTerm}"` 
                    : filters.status || filters.priority || filters.category
                      ? 'No tasks match your filters'
                      : 'No tasks yet'
                  }
                </h3>
                <p>
                  {searchTerm 
                    ? 'Try adjusting your search terms or filters.'
                    : filters.status || filters.priority || filters.category
                      ? 'Try adjusting your filters or create a new task.'
                      : 'Ready to be productive? Create your first task!'
                  }
                </p>
                {!searchTerm && (
                  <button 
                    onClick={handleCreateTask}
                    className="btn btn-primary"
                  >
                    Create Your First Task
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="task-list-header">
                  <h3 className="task-list-title">
                    {searchTerm 
                      ? `Found ${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`
                      : `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`
                    }
                  </h3>
                  <button
                    onClick={() => setShowBulkActions(!showBulkActions)}
                    className="btn btn-ghost btn-sm"
                  >
                    {showBulkActions ? 'Hide' : 'Show'} Bulk Actions
                  </button>
                </div>
                <div className="task-list">
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStartPomodoro={handleStartPomodoro}
                      onSelect={showBulkActions ? handleTaskSelect : null}
                      isSelected={selectedTasks.includes(task._id)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Floating Action Button */}
        <button 
          onClick={handleCreateTask}
          className="fab"
          title="Add New Task"
        >
          +
        </button>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={handleTaskCancel}
            loading={loading}
          />
        )}

        {/* Pomodoro Timer Modal */}
        {showPomodoro && pomodoroTask && (
          <PomodoroTimer
            task={pomodoroTask}
            onClose={() => setShowPomodoro(false)}
            onComplete={handlePomodoroComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;