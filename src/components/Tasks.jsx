import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/tasks.css";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Tasks() {
  //! STATES
  let [tasks, setTasks] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [filter, setFilter] = useState({
    title: "",
    description: "",
    priority: "",
    duedate: "",
  });
  let [sortTask, setSortTask] = useState("title");

  let navigateToUpdateTask = useNavigate();
  let token = localStorage.getItem("token");

  //! TO GET TASK DATA
  let getFilteredSortedTask = async () => {
    try {
      let queryParams = new URLSearchParams({
        ...filter,
        sort: sortTask,
        fields: "title,duedate,priority,description,status,sort",
      });
      let { data } = await axios.get(
        `http://localhost:3000/api/getFilteredSortedTask?${queryParams}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFilteredSortedTask();
  }, [filter, sortTask]);

  // let getTasks = async () => {
  //   try {
  //     let { data } = await axios.get(`http://localhost:3000/api/gettasks`, {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });
  //     setTasks(data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getTasks();
  // }, []);

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
      await axios.delete(`http://localhost:3000/api/deletetask/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // getTasks();
      getFilteredSortedTask();
    } catch (err) {
      console.error(err);
    }
  };
  let getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "task-completed";
      case "to-do":
        return "task-to-do";
      case "in-progress":
        return "task-in-progress";
      default:
        return "";
    }
  };
  return (
    <section className="task-data">
      <div className="task-nav">
        <h1>My Tasks</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button className="nav-btn">
          <BiSortAlt2
            onClick={() => {
              setSortTask(sortTask === "title" ? "-title" : "title");
            }}
          />
        </button>
        <button className="nav-btn">
          <FaFilter
            onClick={() => {
              setFilter({ ...filter, title: searchValue });
            }}
          />
        </button>
        <NavLink
          to="/addtask"
          className="nav-btn"
          style={{ backgroundColor: "green" }}
        >
          New
          <IoMdAdd />
        </NavLink>
      </div>
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
          {tasks.map(
            ({ title, duedate, priority, status, description, _id }, index) => {
              console.log("Status:", status);
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{new Date(duedate).toLocaleDateString()}</td>
                  <td>{priority}</td>
                  <td>{description}</td>
                  <td>
                    <p className={getStatusClass(status)}>{status}</p>
                  </td>
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
export default Tasks;
