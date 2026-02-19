import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

// Create Task Context
const TaskContext = createContext();

// Task Actions
const TASK_ACTIONS = {
  FETCH_TASKS_START: 'FETCH_TASKS_START',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',
  CREATE_TASK_START: 'CREATE_TASK_START',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',
  UPDATE_TASK_START: 'UPDATE_TASK_START',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_FAILURE: 'UPDATE_TASK_FAILURE',
  DELETE_TASK_START: 'DELETE_TASK_START',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial State
const initialState = {
  tasks: [],
  loading: false,
  error: null
};

// Task Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.FETCH_TASKS_START:
    case TASK_ACTIONS.CREATE_TASK_START:
    case TASK_ACTIONS.UPDATE_TASK_START:
    case TASK_ACTIONS.DELETE_TASK_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case TASK_ACTIONS.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null
      };
    
    case TASK_ACTIONS.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [action.payload, ...state.tasks],
        error: null
      };
    
    case TASK_ACTIONS.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        error: null
      };
    
    case TASK_ACTIONS.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        error: null
      };
    
    case TASK_ACTIONS.FETCH_TASKS_FAILURE:
    case TASK_ACTIONS.CREATE_TASK_FAILURE:
    case TASK_ACTIONS.UPDATE_TASK_FAILURE:
    case TASK_ACTIONS.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case TASK_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Task Provider Component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch all tasks
  const fetchTasks = async (filters = {}) => {
    dispatch({ type: TASK_ACTIONS.FETCH_TASKS_START });
    
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.order) queryParams.append('order', filters.order);
      
      const response = await axios.get(`/api/tasks?${queryParams}`);
      
      dispatch({
        type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
        payload: response.data.tasks
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch tasks';
      dispatch({
        type: TASK_ACTIONS.FETCH_TASKS_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    dispatch({ type: TASK_ACTIONS.CREATE_TASK_START });
    
    try {
      const response = await axios.post('/api/tasks', taskData);
      
      dispatch({
        type: TASK_ACTIONS.CREATE_TASK_SUCCESS,
        payload: response.data.task
      });
      
      return { success: true, task: response.data.task };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create task';
      dispatch({
        type: TASK_ACTIONS.CREATE_TASK_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Update task
  const updateTask = async (taskId, taskData) => {
    dispatch({ type: TASK_ACTIONS.UPDATE_TASK_START });
    
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, taskData);
      
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK_SUCCESS,
        payload: response.data.task
      });
      
      return { success: true, task: response.data.task };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update task';
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    dispatch({ type: TASK_ACTIONS.DELETE_TASK_START });
    
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK_SUCCESS,
        payload: taskId
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK_FAILURE,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};