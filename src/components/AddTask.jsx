import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import { validateFormData } from "../helper/taskValidation";
import "../style/addtask.css";

let options = [
  { value: "", label: "Set priority" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function AddTask() {
  //! STATES
  let [startDate, setStartDate] = useState(new Date());
  let [taskData, setTaskData] = useState({
    title: "",
    priority: options[0].value,
    duedate: new Date(),
    description: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");

  //! FUNCTION TO HANDLE USER EXPENSE

  let getData = ({ target: { value, name } }) => {
    setTaskData({ ...taskData, [name]: value });
  };

  //^ FOR SELECT OPTION

  let getSelectOption = (selectedOption) => {
    setTaskData({ ...taskData, priority: selectedOption.value });
  };

  //^ FOR DATE

  let getDate = (date) => {
    setStartDate(date);
    setTaskData({ ...taskData, date: date });
  };

  //^ TO ADD TASK

  let addTask = async (e) => {
    e.preventDefault();

    setformErrors(validateFormData(taskData));
    let fdataLength = Object.keys(validateFormData(taskData)).length;
    if (fdataLength === 0) {
      try {
        let { data } = await axios.post(
          `http://localhost:3000/api/addtask`,
          taskData
        );
        setSuccessMsg(data.message);
        setTaskData({
          title: "",
          priority: options[0].value,
          duedate: new Date(),
          description: "",
        });
        setStartDate(new Date());
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="add-task-form">
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="task-div">
        <h1>Add Your Task</h1>

        <form className="task-form">
          <div className="divs">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="To-do title"
              name="title"
              id="title"
              value={taskData.title}
              onChange={getData}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.title}
          </small>
          <div className="divs">
            <label>Priority:</label>
            <Select
              className="select"
              defaultValue={options[0]}
              options={options}
              onChange={getSelectOption}
              name="priority"
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.priority}
          </small>

          <div className="divs">
            <label>Date:</label>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={getDate}
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
              placeholder="Description"
              value={taskData.description}
              onChange={getData}
            ></textarea>
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.description}
          </small>

          <button type="submit" className="add-btn" onClick={addTask}>
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddTask;
