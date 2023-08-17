import React from 'react';

const Column = ({ title, children, tasks, onMoveLeft, onMoveRight, onDelete, onClearDone }) => {

    return (
        <div className="column">
            <h2>{title}</h2>
            {tasks.map(task => (
                <div key={task.id} className="task">
                    <span>{task.title}</span>
                    <div>
                        {title !== "To Do" && <button onClick={() => onMoveLeft(task.id)}>←</button>}
                        <button onClick={() => onDelete(task.id)}>×</button>
                        {title !== "Done" && <button onClick={() => onMoveRight(task.id)}>→</button>}
                    </div>
                </div>
            ))}
            <div className="task-controls">
                {children}
            </div>
            {title === "Done" && (
                <button className="clear-done-btn" onClick={onClearDone}>
                    Clear All
                </button>
            )}
        </div>
    );
};

export default Column;
