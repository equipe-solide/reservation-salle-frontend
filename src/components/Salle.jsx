import React, { useEffect, useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import MantineDataTable from "../components/mantine/MantineDataTable";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import Notiflix, { Confirm, Notify } from "notiflix";
import NotiflixConfirm from "../components/notiflix/NotiflixConfirm";
import { ROOM_API_URL } from "../services/url.room";
import FormulaireSalle from "./FormulaireSalle";
import { useDisclosure } from "@mantine/hooks";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import EquipementInSalle from "./EquipementInSalle";

function Salle() {
  const [salleData, setSalleData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEquipement, {toggle: toggleEquipement}] = useDisclosure(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [infoSalle, setInfoSalle] = useState(null);

  useEffect(() => {
    getSalleData();
  }, [refresh]);

  const getSalleData = async () => {
    await axios
      .get(ROOM_API_URL)
      .then((res) => {
        setSalleData(res.data);
        console.log("data ==>", res.data);
      })
      .catch((err) => console.log(err, "error"));
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
    setDataToUpdate(null);
    close();
  };

  const handleOpen = () => {
    setDataToUpdate(null);
    open();
  };

  const Actions = (rowData) => {
    const clickUpdate = () => {
      console.log("update", rowData);
      setDataToUpdate(rowData.item);
      open();
    };

    const clickInfoSalle = () => {
      console.log("info salle", rowData.item);
      setInfoSalle(rowData.item);
      toggleEquipement();
    };

    const clickDelete = async () => {
      console.log("delete==>", rowData);
      await NotiflixConfirm().then(() => {
        axios
          .delete(`${ROOM_API_URL}/${rowData.item.id}`)
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
        <HiOutlineViewGridAdd
          onClick={clickInfoSalle}
          size={30}
          className="cursor-pointer text-black/75"
          title="voir equipement"
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
    <div>
      <div className="my-5">
        <Button variant="outline" onClick={handleOpen}>Ajouter une salle</Button>
      </div>

      <MantineDataTable
        data={salleData}
        tableHeaders={["Salle", "Lieu"]}
        tableFields={["libelle", "lieu"]}
        ActionComponent={Actions}
      />
      <Modal opened={opened} onClose={close} title="Ajouter une salle" size="md">
        {opened && <FormulaireSalle refresh={handleRefresh} dataToUpdate={dataToUpdate} />}
      </Modal>
      <Modal opened={openedEquipement} onClose={toggleEquipement} title="Gerer les équipements" fullScreen closeOnEscape>
        {openedEquipement && <EquipementInSalle infoSalle={infoSalle} />}
      </Modal>
    </div>
  );
}
export default Salle;
