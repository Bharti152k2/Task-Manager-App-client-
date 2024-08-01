import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import TaskList from "./components/TaskList.jsx";
import Navbar from "./components/Navbar.jsx";
import AddTask from "./components/AddTask.jsx";
import Task from "./components/Task.jsx";
import UpdateTask from "./components/UpdateTask.jsx";
import Authentication from "./components/Authentication.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Authentication>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Task />
                </ProtectedRoute>
              }
            />
            <Route path="/tasks" element={<AddTask />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/updatetask/:pid" element={<UpdateTask />} />
          </Routes>
        </BrowserRouter>
      </Authentication>
    </>
  );
}

export default App;
