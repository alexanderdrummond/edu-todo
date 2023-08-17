import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';

const Board = () => {

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), title: newTask, status: 'To Do' }]);
            setNewTask('');
        }
    };

    const moveTask = (id, newStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const clearDoneTasks = () => {
        if (window.confirm("Are you sure you want to remove all done tasks?")) {
            const updatedTasks = tasks.filter(task => task.status !== "Done");
            setTasks(updatedTasks);
        }
    };

    return (
        <div className="board">
            <Column
                title="To Do"
                tasks={tasks.filter(task => task.status === "To Do")}
                onMoveRight={(id) => moveTask(id, "In Progress")}
                onDelete={deleteTask} 
            >
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button className="add-new-btn" onClick={handleAddTask}>+</button>
            </Column>

            <Column
                title="In Progress"
                tasks={tasks.filter(task => task.status === "In Progress")}
                onMoveLeft={(id) => moveTask(id, "To Do")}
                onMoveRight={(id) => moveTask(id, "Done")}
                onDelete={deleteTask} 
            />
            <Column
                title="Done"
                tasks={tasks.filter(task => task.status === "Done")}
                onMoveLeft={(id) => moveTask(id, "In Progress")}
                onDelete={deleteTask} 
                onClearDone={clearDoneTasks} 
            />
        </div>
    );
};

export default Board;
