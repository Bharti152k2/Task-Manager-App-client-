import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authentication";

function ProtectedRoute({ children }) {
  let { auth } = useContext(AuthContext);
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;

}

export default ProtectedRoute;
