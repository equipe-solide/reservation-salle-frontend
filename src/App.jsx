import React from "react";
import MantineProviderComponent from "./components/mantine/MantineProvider";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reservation from "./pages/Reservation";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Utilisateur from "./pages/Utilisateur";
import Statistique from "./pages/Statistique";
import Auth from "./utils/CheckAuth";
import AuthApi from "./utils/AuthApi";
import SalleAndEquipment from "./pages/SalleAndEquipment";

//setup axios
AuthApi.setup();

function App() {
  return (
    <MantineProviderComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          >
            <Route index element={<Statistique />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="utilisateur" element={<Utilisateur />} />
            <Route path="salle_equipement/*" element={<SalleAndEquipment />} />
            <Route path="salle_equipement/:tabValue" element={<SalleAndEquipment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProviderComponent>
  );
}

export default App;
