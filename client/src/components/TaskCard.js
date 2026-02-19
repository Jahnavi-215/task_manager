const TaskCard = ({ task, onEdit, onDelete, onStartPomodoro, onSelect, isSelected }) => {
  // Format due date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if task is overdue
  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'Completed') return false;
    return new Date(dueDate) < new Date();
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-warning';
      case 'In Progress':
        return 'badge-primary';
      case 'Completed':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  // Get priority dot color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return '#10B981'; // green
      case 'Medium':
        return '#F59E0B'; // yellow
      case 'High':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className={`task-card ${isSelected ? 'selected' : ''}`}>
      {/* Selection checkbox for bulk operations */}
      {onSelect && (
        <div className="task-select">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(task._id)}
            className="task-checkbox"
          />
        </div>
      )}
      
      <div className="task-header">
        <div className="task-title-section">
          <div className="task-title-row">
            <div 
              className="priority-dot" 
              style={{ backgroundColor: getPriorityColor(task.priority) }}
              title={`${task.priority} priority`}
            ></div>
            <h3 className="task-title">{task.title}</h3>
          </div>
          {task.category && (
            <div className="task-category text-muted">{task.category}</div>
          )}
        </div>
        <div className="task-actions">
          {onStartPomodoro && task.status !== 'Completed' && (
            <button 
              onClick={() => onStartPomodoro(task)} 
              className="btn btn-ghost btn-sm"
              title="Start Pomodoro Timer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
            </button>
          )}
          <button 
            onClick={() => onEdit(task)} 
            className="btn btn-ghost btn-sm"
            title="Edit task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="btn btn-ghost btn-sm text-danger"
            title="Delete task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
            </svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description text-muted">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="task-tag">
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="task-tag-more">+{task.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Subtasks Progress */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="subtasks-progress">
          <div className="progress-info">
            <span className="text-muted">
              {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
            </span>
            <span className="text-muted">{task.completionPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${task.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="task-footer">
        <div className="task-meta">
          <span className={`badge ${getStatusBadge(task.status)}`}>
            {task.status}
          </span>
          
          {task.dueDate && (
            <span className={`task-due-date ${overdue ? 'overdue' : ''}`}>
              {overdue ? '⚠️ ' : ''}
              {formatDate(task.dueDate)}
              {overdue && ' overdue'}
            </span>
          )}
        </div>

        {/* Time tracking info */}
        {task.pomodoroSessions > 0 && (
          <div className="task-time-info text-muted">
            {task.pomodoroSessions} pomodoro{task.pomodoroSessions !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;