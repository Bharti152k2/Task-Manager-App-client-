import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../style/tasklist.css";

function TaskList() {
  //! STATES
  let [tasks, setTasks] = useState([]);
  let [title, setTitle] = useState("");

  let navigateToUpdateTask = useNavigate();
  //! TO GET INPUT FIELD VALUE
  let getTitle = ({ target: { value } }) => {
    setTitle(value);
  };
  //! TO GET TASK DATA
  let getTasks = async (filterTitle = "") => {
    try {
      let { data } = await axios.get(
        `http://localhost:3000/api/getfilteredsortedtask`,
        {
          params: { title: filterTitle },
        }
      );
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks(title);
  }, [title]);

  //! TO UPDATE AND DELETE TASK

  let updateTask = (id) => {
    navigateToUpdateTask(`/updatetask/${id}`);
  };

  let deleteTask = async (id) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/deletetask/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="task-data">
      <input
        type="text"
        placeholder="Search Title"
        value={title}
        onChange={getTitle}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>DueDate</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.data?.map(
            ({ title, duedate, priority, status, description, _id }, index) => {
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{new Date(duedate).toLocaleDateString()}</td>
                  <td>{priority}</td>
                  <td>{description}</td>
                  <td>{status}</td>
                  <td>
                    <button
                      className="edtbtn"
                      onClick={() => {
                        updateTask(_id);
                      }}
                    >
                      <MdEdit />
                    </button>
                  </td>

                  <td>
                    <button
                      className="dltbtn"
                      onClick={() => {
                        deleteTask(_id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </section>
  );
}
export default TaskList;
