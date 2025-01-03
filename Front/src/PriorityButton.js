import React from 'react';

const PriorityButton = ({ priority, onPriorityChange }) => {
  const priorities = ['low', 'medium', 'high'];
  
  const handleClick = () => {
    const currentIndex = priorities.indexOf(priority);
    const nextPriority = priorities[(currentIndex + 1) % priorities.length];
    onPriorityChange(nextPriority);
  };

  return (
    <div className="priority-container">
      <button
        onClick={handleClick}
        className={`priority-button active`}
      >
        <span className={`dot ${priority}`}></span>
        {priority}
      </button>
    </div>
  );
};

export default PriorityButton;