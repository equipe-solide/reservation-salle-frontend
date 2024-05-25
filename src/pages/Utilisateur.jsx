import React from "react";
import { Button, Group, Modal, Table } from "@mantine/core";
import MantineDataTable from "../components/mantine/MantineDataTable";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import FormulaireUtilisateur from "../components/FormulaireUtilisateur";
import { useDisclosure } from "@mantine/hooks";

function Utilisateur() {
   const [opened, { open, close }] = useDisclosure(false);

  const elements = [
    {
      position: 1,
      name: "Hydrogen",
      symbol: "H",
    },
    {
      position: 2,
      name: "Helium",
      symbol: "He",
    },
    {
      position: 3,
      name: "Lithium",
      symbol: "Li",
    },
  ];

  const Actions = (item) => {
    const clickUpdate = () => {
      console.log("update", item);
    };

    const clickDelete = () => {
      console.log("delete", item);
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
        <Button variant="outline" onClick={open}>
          Ajouter un utilisateur
        </Button>
      </div>

      <MantineDataTable
        data={elements}
        tableHeaders={["Nom", "Email", "Rôle"]}
        tableFields={["position", "name", "symbol"]}
        ActionComponent={Actions}
      />
      <Modal
        opened={opened}
        onClose={close}
        title="Nouveau Utilisateur"
        size="xl"
      >
        {opened && <FormulaireUtilisateur />}
      </Modal>
    </div>
  );
}

export default Utilisateur;
