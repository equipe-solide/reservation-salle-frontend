import React, { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { Button, Group, Select, SimpleGrid, Stack } from "@mantine/core";
import * as Yup from "yup";
import { VscRefresh } from "react-icons/vsc";
import axios from "axios";
import { ROOM_API_URL } from "../services/url.room";
import { RESERVATION_API_URL } from "../services/url.reservation";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import "dayjs/locale/fr";
import { IoCheckmark } from "react-icons/io5";
import MantineReservationStatutBadge from "./mantine/MantineReservationStatutBadge";
import { Notify } from "notiflix";
import AuthApi from "../utils/AuthApi";
import { formatToInput } from "../utils/Tools";

const statusData = [
  { value: "en attente", label: "en attente" },
  { value: "annulé", label: "annulé" },
  { value: "confirmé", label: "confirmé" },
];

const initialValues = {
  salle: null,
  date_debut: null,
  date_fin: null,
  statut: statusData[0].value,
};

function FormulaireReservation({ refresh, dataToUpdate }) {
  const [salleData, setSalleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const reservationSchema = Yup.object({
    salle: Yup.string().required("Veuillez renseigner ce champ"),
    date_debut: Yup.string().required("Veuillez renseigner ce champ"),
    date_fin: Yup.string().nullable(),
    statut: Yup.string().required("Veuillez renseigner ce champ"),
  });

  useEffect(() => {
    getSalleData();
  }, []);

  const getSalleData = async () => {
    await axios
      .get(ROOM_API_URL)
      .then((res) => {
        const formattedData = res.data.map((room) => ({
          value: JSON.stringify(room), // Utiliser JSON.stringify pour stocker l'objet sous forme de chaîne
          label: room.libelle,
        }));
        setSalleData(formattedData);
        setLoading(false);
        console.log("data salle ==>", res.data);
      })
      .catch((err) => console.log(err, "error"));
  };

  const { values, reset, setValues, setFieldValue, getInputProps, onSubmit } =
    useForm({
      initialValues,
      validate: yupResolver(reservationSchema),
      mode: "controlled",
    });

  useEffect(() => {
    if (!loading && dataToUpdate) {
      const { room, date_heure_debut, date_heure_fin, statut } = dataToUpdate;
      const formattedRoom = {
        value: JSON.stringify(room),
        label: room.libelle,
      };
      setValues({
        date_debut: new Date(date_heure_debut),
        date_fin: new Date(date_heure_fin),
        salle: formattedRoom.value,
        statut: statut,
      });
    }
  }, [dataToUpdate,loading]);

  const handleForm = () => {
    let form = {
      date_heure_debut: formatToInput(values.date_debut),
      date_heure_fin: values.date_fin && formatToInput(values.date_fin),
      room_id: JSON.parse(values.salle).id, // Convertir la chaîne en objet
      statut: values.statut,
      user_id: AuthApi.getUserId(),
    };
    return form;
  };

  const handleAdd = async () => {
    let form = handleForm();

    console.log("form add", form);

    await axios
      .post(RESERVATION_API_URL, form)
      .then((res) => {
        reset();
        refresh();
        console.log("res", res);
        if (!res.data.error) {
          Notify.success("La salle a été crée");
        } else {
          Notify.failure(res.data?.error);
        }
      })
      .catch((err) => {
        console.log("error", err);
        Notify.failure("Erreur de l'opération");
      });
  };

  const handleUpdate = async () => {
    let form = handleForm();

    console.log("form update", form);

    await axios
      .put(`${RESERVATION_API_URL}/${dataToUpdate.id}`, form)
      .then((res) => {
        reset();
        refresh();
        if (!res.data.error) {
          Notify.success("La salle a été modifiée");
        } else {
          Notify.failure(res.data?.error);
        }
      })
      .catch((err) => {
        console.log("error", err);
        Notify.failure("Erreur de l'opération");
      });
  };

  const renderSelectStatus = ({ option, checked }) => {
    return (
      <Group flex="1" gap="xs">
        <MantineReservationStatutBadge status={option.label} />
        {checked && <IoCheckmark style={{ marginInlineStart: "auto" }} />}
      </Group>
    );
  };

  return (
    <div className="">
      <form onSubmit={onSubmit(dataToUpdate ? handleUpdate : handleAdd)}>
        <Stack spacing="md">
          <DatesProvider settings={{ locale: "fr" }}>
            <SimpleGrid cols={2}>
              <Select
                required
                label="Salle"
                data={salleData}
                placeholder="Choisir la salle"
                clearable
                {...getInputProps("salle")}
              />
              <Select
                required
                label="Statut"
                data={statusData}
                placeholder="Statut de la reservation"
                renderOption={renderSelectStatus}
                {...getInputProps("statut")}
              />
              <DatePickerInput
                required
                label="Date debut"
                placeholder="jj/mm/aaaa"
                valueFormat="DD / MM / YYYY"
                {...getInputProps("date_debut")}
              />

              <DatePickerInput
                label="Date fin"
                placeholder="jj/mm/aaaa"
                valueFormat="DD / MM / YYYY"
                {...getInputProps("date_fin")}
              />
            </SimpleGrid>
          </DatesProvider>
          <Group justify="end" className="mt-24">
            <Button type="button" variant="outline" onClick={reset}>
              <VscRefresh size={25} />
            </Button>
            <Button variant="outline" type="submit">
              {dataToUpdate ? "Modifier" : "Ajouter"}
            </Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
}

export default FormulaireReservation;
