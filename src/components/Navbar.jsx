import { NavLink } from "react-router-dom";
import "../style/navbar.css";
import { useContext } from "react";
import { AuthContext } from "./Authentication";

function Navbar() {
  // let { isLoggin, logout } = useContext(AuthContext);

  return (
    <nav>
      <span>
        <h1>Task</h1>
        <h2>Manager</h2>
      </span>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        {<NavLink to="/register">Signup</NavLink>}
        {<NavLink to="/login">Login</NavLink>}
        {/* {isLoggin && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )} */}
      </div>
    </nav>
  );
}

export default Navbar;
