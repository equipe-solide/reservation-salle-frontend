import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import Salle from "../components/Salle";
import Equipement from "../components/Equipement";
import { useEffect, useState } from "react";

function SalleAndEquipment() {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  useEffect(() => {
    console.log("SalleAndEquipment mounted");
    return () => {
      console.log("SalleAndEquipment unmounted");
    };
  }, []);

  return (
    <div className="py-5">
      {" "}
      <Tabs
        color="#6d9abc"
        variant="pills"
        radius="xl"
        value={tabValue}
        onChange={(value) => navigate(`/dashboard/salle_equipement/${value}`)}
        keepMounted={false}
        defaultValue="salle"
      >
        <Tabs.List>
          <Tabs.Tab value="salle">Salle</Tabs.Tab>
          <Tabs.Tab value="equipement">Equipement</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="salle">
          <Salle />
        </Tabs.Panel>
        <Tabs.Panel value="equipement">
          <Equipement />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default SalleAndEquipment;
