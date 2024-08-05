import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext();

function Authentication({ children }) {
  let [auth, setAuth] = useState({ token: null, isLoggedIn: false });
  let navigate = useNavigate();

  let login = (token, expiry) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expiry);
    setAuth({ token, isLoggedIn: true });
    setTimeout(() => {
      logout();
    }, expiry - new Date().getTime());
  };

  let logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setAuth({ token: null, isLoggedIn: false });
    navigate("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry) {
      let now = new Date().getTime();
      if (now < tokenExpiry) {
        setAuth({ token, isLoggedIn: true });
        setTimeout(() => {
          logout();
        }, tokenExpiry - now);
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Authentication;
