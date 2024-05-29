import { Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import FormulaireEquipementInSalle from "./FormulaireEquipementInSalle";
import MantineDataTable from "./mantine/MantineDataTable";
import { EQUIPEMENT_API_URL, ROOM_API_URL } from "../services/url.room";
import NotiflixConfirm from "./notiflix/NotiflixConfirm";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { Notify } from "notiflix";

function EquipementInSalle({ infoSalle }) {
  const [equipementData, setEquipementData] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("data ==>", infoSalle.id);
    getEquipementData();
  }, [refresh]);

  const getEquipementData = async () => {
    await axios
      .get(`${ROOM_API_URL}/${infoSalle.id}`)
      .then((res) => {
        setEquipementData(res.data.equipements);
        console.log("data ==>", res.data.equipements);
      })
      .catch((err) => console.log(err, "error"));
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
    setDataToUpdate(null);
  };

  const Actions = (rowData) => {
    const clickUpdate = () => {
      console.log("update", rowData);
      setDataToUpdate(rowData.item);
    };

    const clickDelete = async () => {
      console.log("delete==>", rowData.item);
      await NotiflixConfirm().then(() => {
        axios
          .delete(`${EQUIPEMENT_API_URL}/${rowData.item.id}`)
          .then((res) => {
            setRefresh(!refresh);
            Notify.success("Suppression avec succès");
          })
          .catch((err) => {
            console.log(err, "error");
            Notify.failure("Erreur de l'opération");
          });
      });
    };

    return (
      <Group>
        <HiOutlinePencilSquare
          onClick={clickUpdate}
          size={30}
          className="cursor-pointer text-gray-500"
          title="modifier salle"
        />
        <IoCloseCircleOutline
          onClick={clickDelete}
          size={30}
          className="cursor-pointer text-red-800"
          title="supprimer salle"
        />
      </Group>
    );
  };

  return (
    <div className="">
      <Stack justify="center" gap="md">
        <div className="bg-gray-200 rounded-md p-5">
          <Stack gap={0}>
            <Group justify="end" align="end">
              <p>Salle :</p>
              <h2>{infoSalle.libelle}</h2>
            </Group>
            <Group justify="end" align="end">
              <p>Lieu :</p>
              <h2>{infoSalle.lieu}</h2>
            </Group>
          </Stack>
        </div>
        <div className="grid md:grid-cols-3 bg-red-500s pt-10 gap-10 content-between">
          <div className="bg-gray-200 rounded-md col-span-1 p-5">
            <FormulaireEquipementInSalle
              dataToUpdate={dataToUpdate}
              roomId={infoSalle.id}
              refresh={handleRefresh}
            />
          </div>
          <div className="md:col-span-2 overflow-scrolls h-auto">
            <MantineDataTable
              data={equipementData}
              tableHeaders={["Designation", "Description", "Disponibilité"]}
              tableFields={["designation", "description", "dispo"]}
              ActionComponent={Actions}
            />
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default EquipementInSalle;
