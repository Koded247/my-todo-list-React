import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ]);
  
  const [filter, setFilter] = useState("All");

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const [newTaskName, setNewTaskName] = useState("");

  function handleTaskInputChange(e) {
    setNewTaskName(e.target.value);
  }

  function addTask(e) {
    e.preventDefault();
    if (newTaskName.trim() === "") return;
    
    const newTask = {
      id: `todo-${tasks.length}`,
      name: newTaskName,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskName(""); // Reset input field
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <li key={task.id} className="todo stack-small">
        <div className="c-cb">
          <input
            id={task.id}
            type="checkbox"
            defaultChecked={task.completed}
            onChange={() => toggleTaskCompleted(task.id)}
          />
          <label className="todo-label" htmlFor={task.id}>
            {task.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">{task.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(task.id)}
          >
            Delete <span className="visually-hidden">{task.name}</span>
          </button>
        </div>
      </li>
    ));

  const filterButtons = FILTER_NAMES.map(name => (
    <button
      key={name}
      type="button"
      className="btn toggle-btn"
      aria-pressed={filter === name}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  ));

  const tasksRemaining = tasks.filter(task => !task.completed).length;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <form onSubmit={addTask}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={newTaskName}
          onChange={handleTaskInputChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>

      <h2 id="list-heading">{tasksRemaining} tasks remaining</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
