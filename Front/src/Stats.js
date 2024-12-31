import React from 'react';
import './Stats.css';

const Stats = ({ todos }) => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const incompletedTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round(completedTasks / totalTasks * 100);

    return (
        <div className="stats">
            <h2>Stats</h2>
            <p>Completion percentage: <span className='percentage'>{completionPercentage}%</span></p>
            <p>Total tasks: {totalTasks}</p>
            <p>Completed tasks: {completedTasks}</p>
            <p>Incompleted tasks: {incompletedTasks}</p>  
        </div>
    );

};

export default Stats;