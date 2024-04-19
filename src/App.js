import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setInputValue(tasks[index].text);
  };

  const handleUpdateTask = () => {
    if (inputValue.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[editIndex].text = inputValue;
      setTasks(newTasks);
      setEditIndex(-1);
      setInputValue('');
    }
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <h1>To-do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task"
          className="input-field"
        />
        <button
          onClick={editIndex === -1 ? handleAddTask : handleUpdateTask}
          className="button"
        >
          {editIndex === -1 ? 'Add Task' : 'Update Task'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span onClick={() => handleToggleComplete(index)}>{task.text}</span>
            <div className="button-group">
              <button onClick={() => handleEditTask(index)} className="button">
                Edit
              </button>
              <button
                onClick={() => handleRemoveTask(index)}
                className="button"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;