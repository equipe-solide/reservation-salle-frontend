import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";
import MantineDataTable from "../components/mantine/MantineDataTable";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { USER_API_URL } from "../services/url.user";
import Notiflix, { Confirm, Notify } from "notiflix";
import NotiflixConfirm from "../components/notiflix/NotiflixConfirm";

function Utilisateur() {
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserData();
  }, [refresh]);

  const getUserData = async () => {
    await axios
      .get(USER_API_URL)
      .then((res) => {
        setUserData(res.data);
        console.log("data ==>", res.data);
      })
      .catch((err) => console.log(err, "error"));
  };

  const Actions = (rowData) => {
    const clickUpdate = () => {
      console.log("update", rowData);
    };

    const clickDelete = async () => {
      console.log("delete==>", rowData);
      await NotiflixConfirm().then(() => {
        axios
          .delete(`${USER_API_URL}/${rowData.item.id}`)
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
        />
        <IoCloseCircleOutline
          onClick={clickDelete}
          size={30}
          className="cursor-pointer text-red-800"
        />
      </Group>
    );
  };
  return (
    <div>
      <div className="my-5">
        <Button variant="outline">Ajouter un utilisateur</Button>
      </div>

      <MantineDataTable
        data={userData}
        tableHeaders={["Nom", "Prénoms", "Email", "Rôle"]}
        tableFields={["nom", "prenoms", "email", "role"]}
        ActionComponent={Actions}
      />
    </div>
  );
}
export default Utilisateur;
