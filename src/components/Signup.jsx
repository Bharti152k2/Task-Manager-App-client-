import React, { Fragment, useState } from "react";
import Input from "./Input.jsx";
import { inputData } from "../helper/signupFields.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateFormData } from "../helper/signupValidations.js";
import "../style/signup.css";
import { useSelector, useDispatch } from "react-redux";
import { addSignupUser } from "../redux/auth/authSlice.js";

function SignUp() {
  //! STATES

  let [signupData, setsignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");
  // console.log(successMsg);

  //! HOOK TO NAVIGATE

  let navigateToLogin = useNavigate();

  let { user } = useSelector((state) => state.user);
  // console.log(user);
  let dispatch = useDispatch();

  //! FUNCTION TO GET INPUT DATA

  let getData = ({ target: { value, name } }) => {
    setsignupData({ ...signupData, [name]: value });
    dispatch(addSignupUser(signupData));
  };

  //! FUNCTION TO POST DATA AFTER VALIDATING
  let postSignupData = async (e) => {
    e.preventDefault();

    setformErrors(validateFormData(signupData));
    console.log(formErrors);
    let fdataLength = Object.keys(validateFormData(signupData)).length;
    console.log(fdataLength);

    if (fdataLength === 0) {
      try {
        let { data } = await axios.post(
          `http://localhost:3000/api/signup`,
          signupData
        );
        console.log(data);
        console.log(data.message);
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigateToLogin("/login");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //! JSX
  return (
    <>
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="formdiv">
        <h2>Create a new account</h2>
        <form>
          {inputData.map(({ id, type, placeholder, value, name, options }) => {
            if (type === "radio") {
              return (
                <Fragment key={id}>
                  <div className="gender">
                    <label>Gender</label>
                    {options.map((option) => (
                      <label key={option.value}>
                        <input
                          type="radio"
                          name={name}
                          value={option.value}
                          checked={signupData[name] === option.value}
                          onChange={getData}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <div>
                    {formErrors[name] && (
                      <small
                        style={{ padding: "0px 0px 0px 5px", color: "red" }}
                      >
                        {formErrors[name]}
                      </small>
                    )}
                  </div>
                </Fragment>
              );
            } else {
              return (
                <Input
                  key={id}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  name={name}
                  option={options}
                  onchange={getData}
                  errMsg={formErrors[name]}
                />
              );
            }
          })}

          <button className="signupbtn" onClick={postSignupData}>
            Register
          </button>
        </form>
        <a href="./login">Already have a account?</a>
      </div>
    </>
  );
}

export default SignUp;
