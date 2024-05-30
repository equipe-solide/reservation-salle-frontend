import React, { useEffect, useState } from "react";
import MantineDataTable from "./mantine/MantineDataTable";
import { EQUIPEMENT_API_URL } from "../services/url.room";
import axios from "axios";

function Equipement() {
  const [equipementData, setEquipementData] = useState(null);

  useEffect(() => {
    getEquipementData();
  }, []);

  const getEquipementData = async () => {
    await axios
      .get(EQUIPEMENT_API_URL)
      .then((res) => {
        setEquipementData(res.data);
        console.log("data ==>", res.data);
      })
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div className="my-4">
      <MantineDataTable
        data={equipementData}
        tableHeaders={["Designation", "Description"]}
        tableFields={["designation", "description"]}
      />
    </div>
  );
}

export default Equipement;
