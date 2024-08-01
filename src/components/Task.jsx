import React from "react";
import "../style/task.css";
import { NavLink } from "react-router-dom";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function Task() {
  return (
    <section className="task-page">
      <div className="side-bar">
        <h1>Task Manager</h1>
        <p>Here you can add task and manage your tasks</p>
        <div className="link">
          <NavLink to="/tasks">Add Task To-do</NavLink>
          <NavLink to="/tasks">View Task List</NavLink>
        </div>
        <h1>Filter & Sort</h1>
      </div>
      <div className="view-bar">
        <AddTask />
        <br />
        <br />
        <br />
        <hr />
        <br />
        <TaskList />
      </div>
    </section>
  );
}

export default Task;
