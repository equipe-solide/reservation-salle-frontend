import axios from "axios";

const logout = () => {
  delete axios.defaults.headers["Authorization"];
  window.localStorage.removeItem("authToken");
};

const setup = () => {
  const token = window.localStorage.getItem("authToken");
  const parsedToken = JSON.parse(token);
  if (parsedToken) {
    axios.defaults.headers["Authorization"] =
      "Bearer " + parsedToken.access_token;
  } else {
    logout();
  }
};

const getEmail = () => {
  const token = window.localStorage.getItem("authToken");
  return token ? JSON.parse(token).user.email : "";
};

const getRole = () => {
  const token = window.localStorage.getItem("authToken");
  return token ? JSON.parse(token).user.role : null;
};

const isUtilisateur = () => getRole() === "Utilisateur";
const isAdmin = () => getRole() === "Administrateur";

export default {
  getEmail,
  logout,
  setup,
  getRole,
  isAdmin,
  isUtilisateur
};
