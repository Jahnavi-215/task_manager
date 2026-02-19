import { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks = [], onEdit, onDelete, onToggleComplete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' };
      case 'Medium': return { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
      case 'Low': return { bg: '#D1FAE5', text: '#059669', border: '#6EE7B7' };
      default: return { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#10B981" stroke="#10B981" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'In Progress':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#6C63FF" stroke="#6C63FF" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="white"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#D1D5DB" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset time for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    
    if (d.getTime() === today.getTime()) return 'Today';
    if (d.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'Completed') return false;
    return new Date(dueDate) < new Date();
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      'Work': '💼',
      'Personal': '🏠',
      'Health': '🏥',
      'Learning': '📚',
      'Finance': '💰',
      'Shopping': '🛒',
      'Travel': '✈️',
      'Other': '📋'
    };
    return emojiMap[category] || '📋';
  };

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#F3F4F6"/>
              <path d="M20 32h24M32 20v24" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="empty-title">No tasks yet</h3>
          <p className="empty-description">Create your first task to get started with your productivity journey</p>
        </div>
      ) : (
        <div className="modern-table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <div className="th-content">
                    <input type="checkbox" className="modern-checkbox" />
                  </div>
                </th>
                <th className="col-task">
                  <div className="th-content">Task name</div>
                </th>
                <th className="col-status">
                  <div className="th-content">Status</div>
                </th>
                <th className="col-priority">
                  <div className="th-content">Priority</div>
                </th>
                <th className="col-category">
                  <div className="th-content">Category</div>
                </th>
                <th className="col-due">
                  <div className="th-content">Due date</div>
                </th>
                <th className="col-actions">
                  <div className="th-content"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const priorityColors = getPriorityColor(task.priority);
                const overdue = isOverdue(task.dueDate, task.status);
                
                return (
                  <tr 
                    key={task._id}
                    className={`table-row ${task.status === 'Completed' ? 'row-completed' : ''} ${overdue ? 'row-overdue' : ''}`}
                    onMouseEnter={() => setHoveredRow(task._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="col-checkbox">
                      <div className="td-content">
                        <button 
                          className="status-checkbox"
                          onClick={() => onToggleComplete(task)}
                          aria-label={task.status === 'Completed' ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {getStatusIcon(task.status)}
                        </button>
                      </div>
                    </td>

                    <td className="col-task">
                      <div className="td-content">
                        <div className="task-name-wrapper">
                          <span className="task-name">{task.title}</span>
                          {task.description && (
                            <span className="task-description">{task.description}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="col-status">
                      <div className="td-content">
                        <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                          {task.status}
                        </span>
                      </div>
                    </td>

                    <td className="col-priority">
                      <div className="td-content">
                        <span 
                          className="priority-pill"
                          style={{
                            backgroundColor: priorityColors.bg,
                            color: priorityColors.text,
                            borderColor: priorityColors.border
                          }}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </td>

                    <td className="col-category">
                      <div className="td-content">
                        <span className="category-badge">
                          <span className="category-emoji">{getCategoryEmoji(task.category)}</span>
                          <span className="category-name">{task.category || 'Other'}</span>
                        </span>
                      </div>
                    </td>

                    <td className="col-due">
                      <div className="td-content">
                        <span className={`due-date ${overdue ? 'due-overdue' : ''}`}>
                          {overdue && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="overdue-icon">
                              <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm0 10.5a.875.875 0 110-1.75.875.875 0 010 1.75zm.875-3.5a.875.875 0 01-1.75 0V3.5a.875.875 0 011.75 0V7z"/>
                            </svg>
                          )}
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </td>

                    <td className="col-actions">
                      <div className="td-content">
                        <div className={`action-buttons ${hoveredRow === task._id ? 'visible' : ''}`}>
                          <button 
                            className="action-btn action-edit"
                            onClick={() => onEdit(task)}
                            title="Edit task"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M11.333 2A1.886 1.886 0 0114 4.667l-9 9-3.667 1 1-3.667 9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button 
                            className="action-btn action-delete"
                            onClick={() => onDelete(task._id)}
                            title="Delete task"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
