import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10); // Update every 10ms for smoother display
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

return (
    <div className="stopwatch-container">
        <div className="stopwatch">
            <h2 className="stopwatch-title">Stopwatch</h2>
            <div className="stopwatch-time">
                {formatTime(time)}
            </div>
            <div className="stopwatch-buttons">
                <button
                    onClick={handleStart}
                    disabled={isRunning}
                    className={`button ${isRunning ? 'button-disabled' : 'button-start'}`}
                >
                    Start
                </button>
                <button
                    onClick={handleStop}
                    disabled={!isRunning}
                    className={`button ${!isRunning ? 'button-disabled' : 'button-stop'}`}
                >
                    Stop
                </button>
                <button
                    onClick={handleReset}
                    className="button button-reset"
                >
                    Reset
                </button>
            </div>
        </div>
    </div>
);
};

export default Stopwatch;