import React, { useEffect, useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import MantineDataTable from "../components/mantine/MantineDataTable";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import Notiflix, { Confirm, Notify } from "notiflix";
import NotiflixConfirm from "../components/notiflix/NotiflixConfirm";
import { useDisclosure } from "@mantine/hooks";
import { RESERVATION_API_URL } from "../services/url.reservation";
import MantineReservationStatutBadge from "../components/mantine/MantineReservationStatutBadge";
import FormulaireReservation from "../components/FormulaireReservation";

function Reservation() {
  const [reservationData, setReservationData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  useEffect(() => {
    getReservationData();
  }, [refresh]);

  const getReservationData = async () => {
    await axios
      .get(RESERVATION_API_URL)
      .then((res) => {
        setReservationData(res.data);
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

    const clickDelete = async () => {
      console.log("delete==>", rowData);
      await NotiflixConfirm().then(() => {
        axios
          .delete(`${RESERVATION_API_URL}/${rowData.item.id}`)
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

   // Fonctions de rendu personnalisées pour les champs
   const renderers = {
    salle: (item) => `${item.room.libelle} , ${item.room.lieu}`,
    date_heure_debut: (item) => new Date(item.date_heure_debut).toLocaleDateString("fr-FR"),
    date_heure_fin: (item) => new Date(item.date_heure_fin).toLocaleDateString("fr-FR"),
    email_user: (item) => item.user.email,
    statut : (item) => <MantineReservationStatutBadge status={item.statut} />
  };

  return (
    <div>
      <div className="my-5">
        <Button variant="outline" onClick={handleOpen}>Ajouter une reservation</Button>
      </div>

      <MantineDataTable
        data={reservationData}
        tableHeaders={["Salle", "Date Debut", "Date Fin", "Statut","Utilisateur"]}
        tableFields={["salle", "date_heure_debut","date_heure_fin","statut","email_user"]}
        ActionComponent={Actions}
        renderers={renderers}
      />
      <Modal opened={opened} onClose={close} title="Ajouter une réservation" size="xl">
        {opened && <FormulaireReservation refresh={handleRefresh} dataToUpdate={dataToUpdate} />}
      </Modal>
    </div>
  );
}
export default Reservation;
