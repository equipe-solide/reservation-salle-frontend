import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (window.localStorage.getItem("authToken")) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  if (user === undefined) {
    return null;
  }
  if (user === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;
