import { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import { usePageTitle } from '../hooks/usePageTitle';
import TopBar from '../components/TopBar';
import KPIStats from '../components/KPIStats';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import './Tasks.css';

const Tasks = () => {
  usePageTitle('My Tasks | TaskFlow');
  
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useTask();
  const { success } = useToast();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate stats
  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.status === 'Completed') return false;
      return new Date(t.dueDate) < new Date();
    }).length
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return task.title.toLowerCase().includes(searchLower) ||
             task.description?.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(taskId);
      if (result) {
        success('Task deleted successfully');
      }
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    const result = await updateTask(task._id, { ...task, status: newStatus });
    if (result) {
      success(newStatus === 'Completed' ? 'Task completed! 🎉' : 'Task marked as pending');
    }
  };

  const handleTaskSubmit = async (taskData) => {
    let result;
    if (editingTask) {
      result = await updateTask(editingTask._id, taskData);
      if (result) {
        success('Task updated successfully');
      }
    } else {
      result = await createTask(taskData);
      if (result) {
        success('Task created successfully');
      }
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const topBarActions = (
    <>
      <button className="btn btn-primary" onClick={handleCreateTask}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        New Task
      </button>
    </>
  );

  return (
    <div className="tasks-page">
      <TopBar title="Tasks" actions={topBarActions} />

      <div className="tasks-content">
        <KPIStats stats={stats} />

        <div className="tasks-filters">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <select
              className="form-control"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              className="form-control"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            icon="📋"
            title={filters.search || filters.status || filters.priority ? "No tasks found" : "You're all caught up! 🎉"}
            description={filters.search || filters.status || filters.priority ? "Try adjusting your filters to see more tasks" : "Start by creating your first task to get organized"}
            action={!filters.search && !filters.status && !filters.priority ? handleCreateTask : null}
            actionLabel="Create Your First Task"
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;
