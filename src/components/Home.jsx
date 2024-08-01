import React, { useState } from "react";
import "../style/home.css";
import { NavLink } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";

function home() {
  return (
    <div className="home">
      <section className="img"></section>
      <section className="background">
        <h1>Welcome to Task Manager</h1>
        <div>
          <p>Platform where you can add and</p>
          <div>
            <p>manage your daily Tasks</p>
          </div>
        </div>
        <button>
          <NavLink to="/tasks">TO-DO</NavLink>
          <LuListTodo style={{ fontSize: "25px", color: "darkblue" }} />
        </button>
      </section>
    </div>
  );
}

export default home;
