import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dltTodo } from "../services/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <>
      <div style={{ backgroundColor: "red", height: "30px" }}>
        {todos.map((todo) => {
          return (
            <li key={todos.id}>
              {todo.text}
              <button
                onClick={() => dispatch(dltTodo(todo.id))}
              >
                Remove
              </button>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default Todos;
