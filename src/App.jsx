import React from "react";
import MantineProviderComponent from "./components/mantine/MantineProvider";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reservation from "./pages/Reservation";
import Salle from "./pages/Salle";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Utilisateur from "./pages/Utilisateur";
import Statistique from "./pages/Statistique";

function App() {
  return (
    <MantineProviderComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Statistique
             />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="utilisateur" element={<Utilisateur />} />
            <Route path="salle" element={<Salle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProviderComponent>
  );
}

export default App;
