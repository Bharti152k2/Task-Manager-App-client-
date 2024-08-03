import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/addtask.css";
import "../style/updatetask.css";
import Select from "react-select";
import axios from "axios";
import { validateFormData } from "../helper/taskValidation";
import { useNavigate, useParams } from "react-router-dom";

let options = [
  { value: "", label: "Set priority" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
let statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "on-hold", label: "On Hold" },
];
function UpdateTask() {
  //! STATES
  let [startDate, setStartDate] = useState(new Date());
  let [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    duedate: new Date(),
    description: "",
    status: statusOptions[0].value,
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");
  let { id } = useParams();
  let navigateToTask = useNavigate();

  //! TO CHANGE THE VALUES
  let changeTask = ({ target: { name, value } }) => {
    setTaskData({ ...taskData, [name]: value });
  };

  //^ FOR SELECT OPTION

  let getSelectOption = (selectedOption) => {
    setTaskData({ ...taskData, priority: selectedOption.value });
  };

  let getStatusOption = (selectedOption) => {
    setTaskData({ ...taskData, status: selectedOption.value });
  };
  //^ FOR DATE CHANGE

  let handleDateChange = (date) => {
    setStartDate(date);
    setTaskData({ ...taskData, duedate: date });
  };

  //! TO GET THE SINGLE DATA

  let getSingleTask = async () => {
    try {
      let token = localStorage.getItem("token");

      let { data } = await axios.get(
        `http://localhost:3000/api/getonetask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setTaskData({
        title: data.title,
        priority: data.priority,
        duedate: new Date(data.duedate),
        description: data.description,
        status: data.status,
      });
      setStartDate(new Date(data.duedate));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, [id]);

  //! TO UPDATE EXPENSE

  let updateTask = async (e) => {
    e.preventDefault();

    setformErrors(validateFormData(taskData));
    let fdataLength = Object.keys(validateFormData(taskData)).length;

    if (fdataLength === 0) {
      try {
        let token = localStorage.getItem("token");
        let { data } = await axios.put(
          `http://localhost:3000/api/updatetask/${id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigateToTask("/tasks");
        }, 1000);
        setTaskData({
          title: "",
          priority: options[0].value,
          duedate: new Date(),
          description: "",
          status: statusOptions[0].value,
        });
        setStartDate(new Date());
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="update-task-form">
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="task-div">
        <h1>Update Task</h1>
        <form className="task-form">
          <div className="divs">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={taskData.title}
              onChange={changeTask}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.title}
          </small>

          <div className="divs">
            <label>Priority:</label>

            <Select
              value={
                options.find(
                  (option) => option.value === taskData.priority
                ) || {
                  value: taskData.priority,
                  label: taskData.priority,
                }
              }
              className="select"
              options={options}
              onChange={getSelectOption}
              name="priority"
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.priority}
          </small>
          <div className="divs">
            <label>Status:</label>
            <Select
              value={
                statusOptions.find(
                  (option) => option.value === taskData.status
                ) || {
                  value: taskData.status,
                  label: taskData.status,
                }
              }
              className="select"
              options={statusOptions}
              onChange={getStatusOption}
              name="status"
            />
          </div>
          <div className="divs">
            <label>Date:</label>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={handleDateChange}
              maxDate={new Date()}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.date}
          </small>

          <div className="divs">
            <label htmlFor="desc">Description:</label>
            <textarea
              name="description"
              id="desc"
              value={taskData.description}
              onChange={changeTask}
            ></textarea>
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.description}
          </small>

          <button type="submit" className="add-btn" onClick={updateTask}>
            Update Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateTask;
