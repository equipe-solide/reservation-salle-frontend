import React from "react";
import { useNavigate } from "react-router";

function Login() {
  let navigate = useNavigate();
  return (
    <div>
      Login page
      <button onClick={() => navigate("/dashboard")}>Se connecter</button>
    </div>
  );
}

export default Login;
