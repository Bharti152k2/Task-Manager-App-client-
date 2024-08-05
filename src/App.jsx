import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import AddTask from "./components/AddTask.jsx";
import UpdateTask from "./components/UpdateTask.jsx";
import Authentication from "./components/Authentication.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Tasks from "./components/Tasks.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Authentication>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/updatetask/:id" element={<UpdateTask />} />
          </Routes>
        </Authentication>
      </BrowserRouter>
    </>
  );
}

export default App;
