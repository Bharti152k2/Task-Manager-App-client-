import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../services/todo/todoSlice";
function AddTodo() {
  let [input, setInput] = useState("");
  const dispatch = useDispatch();

  let getValue = ({ target: { value } }) => {
    setInput(value);
  };
  let addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      <form onSubmit={addTodoHandler}>
        <input type="text" value={input} onChange={getValue} />
      </form>
    </>
  );
}

export default AddTodo;
