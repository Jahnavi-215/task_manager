import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PomodoroTimer = ({ task, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4
  });
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio for notifications
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      
      if (timeLeft === 0) {
        handleTimerComplete();
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = async () => {
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // Show browser notification
    if (Notification.permission === 'granted') {
      new Notification(
        isBreak ? 'Break time is over!' : 'Pomodoro completed!',
        {
          body: isBreak ? 'Time to get back to work!' : 'Time for a break!',
          icon: '/favicon.ico'
        }
      );
    }

    if (!isBreak) {
      // Work session completed
      try {
        await axios.post(`/api/pomodoro/complete/${task._id}`, {
          timeSpent: settings.workTime
        });
        
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error('Error completing pomodoro:', error);
      }

      // Start break
      const isLongBreak = session % settings.sessionsUntilLongBreak === 0;
      setTimeLeft((isLongBreak ? settings.longBreak : settings.shortBreak) * 60);
      setIsBreak(true);
      setIsRunning(true);
    } else {
      // Break completed
      setSession(prev => prev + 1);
      setTimeLeft(settings.workTime * 60);
      setIsBreak(false);
      setIsRunning(false);
    }
  };

  const startTimer = async () => {
    if (!isBreak && !isRunning) {
      // Starting a work session
      try {
        await axios.post(`/api/pomodoro/start/${task._id}`);
      } catch (error) {
        console.error('Error starting pomodoro:', error);
      }
    }
    
    setIsRunning(true);
    
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 
      (session % settings.sessionsUntilLongBreak === 0 ? settings.longBreak : settings.shortBreak) * 60 :
      settings.workTime * 60
    );
  };

  const skipSession = () => {
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? 
      (session % settings.sessionsUntilLongBreak === 0 ? settings.longBreak : settings.shortBreak) * 60 :
      settings.workTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="pomodoro-overlay">
      <div className="pomodoro-timer">
        <div className="pomodoro-header">
          <h3 className="pomodoro-title">
            🍅 {isBreak ? 'Break Time' : 'Focus Time'}
          </h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="pomodoro-task">
          <h4>{task.title}</h4>
          <p>Session {session}</p>
        </div>

        <div className="pomodoro-display">
          <div className="timer-circle">
            <svg className="timer-svg" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isBreak ? "#4ecdc4" : "#667eea"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                transform="rotate(-90 50 50)"
                className="timer-progress"
              />
            </svg>
            <div className="timer-text">
              <div className="timer-time">{formatTime(timeLeft)}</div>
              <div className="timer-status">
                {isBreak ? '☕ Break' : '💪 Focus'}
              </div>
            </div>
          </div>
        </div>

        <div className="pomodoro-controls">
          {!isRunning ? (
            <button onClick={startTimer} className="btn btn-primary timer-btn">
              ▶️ Start
            </button>
          ) : (
            <button onClick={pauseTimer} className="btn btn-secondary timer-btn">
              ⏸️ Pause
            </button>
          )}
          
          <button onClick={resetTimer} className="btn btn-secondary timer-btn">
            🔄 Reset
          </button>
          
          <button onClick={skipSession} className="btn btn-secondary timer-btn">
            ⏭️ Skip
          </button>
        </div>

        <div className="pomodoro-settings">
          <h4>⚙️ Settings</h4>
          <div className="settings-grid">
            <div className="setting-item">
              <label>Work Time (min)</label>
              <input
                type="number"
                value={settings.workTime}
                onChange={(e) => setSettings({...settings, workTime: parseInt(e.target.value)})}
                min="1"
                max="60"
                disabled={isRunning}
              />
            </div>
            <div className="setting-item">
              <label>Short Break (min)</label>
              <input
                type="number"
                value={settings.shortBreak}
                onChange={(e) => setSettings({...settings, shortBreak: parseInt(e.target.value)})}
                min="1"
                max="30"
                disabled={isRunning}
              />
            </div>
            <div className="setting-item">
              <label>Long Break (min)</label>
              <input
                type="number"
                value={settings.longBreak}
                onChange={(e) => setSettings({...settings, longBreak: parseInt(e.target.value)})}
                min="1"
                max="60"
                disabled={isRunning}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;