import React, { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Container,
  Group,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import * as Yup from "yup";
import { VscRefresh } from "react-icons/vsc";
import logo from "../assets/images/logo.png";
import { USER_API_URL } from "../services/url.user";
import { checkInputIfEmpty } from "../utils/Tools";
import axios from "axios";
import { Notify } from "notiflix";
import { ROOM_API_URL } from "../services/url.room";

const initialValues = {
  libelle: "",
  lieu: "",
};

function FormulaireSalle({ refresh, dataToUpdate }) {
  useEffect(() => {
    console.log("FormulaireSalle mounded");
    return () => {
      console.log("FormulaireSalle unmounted");
    };
  }, []);

  const salleSchema = Yup.object({
    libelle: Yup.string().required("Veuillez renseigner ce champ"),
    lieu: Yup.string().required("Veuillez renseigner ce champ "),
  });

  const {
    values,
    reset,
    setValues,
    setInitialValues,
    setFieldValue,
    getInputProps,
    onSubmit,
  } = useForm({
    mode: "controlled",
    validateInputOnBlur: true,
    initialValues,
    validate: yupResolver(salleSchema),
  });

  useEffect(() => {
    if (dataToUpdate) {
      let {libelle, lieu} = dataToUpdate
      setValues({
        libelle,
        lieu
      })
    }
  }, []);

  const handleAdd = async () => {
    let form = {
      libelle: values.libelle,
      lieu: values.lieu,
    };

    console.log("form", form);

    await axios
      .post(ROOM_API_URL, form)
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
    let form = {
      libelle: values.libelle,
      lieu: values.lieu,
    };

    console.log("form", form);

    await axios
      .put(`${ROOM_API_URL}/${dataToUpdate.id}`, form)
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

  return (
    <div className="">
      <form onSubmit={onSubmit(dataToUpdate ? handleUpdate : handleAdd)}>
        <Stack spacing="md">
          <TextInput
            required
            label="Libelle"
            placeholder="Salle 001"
            {...getInputProps("libelle")}
          />
          <TextInput
            label="Lieu"
            placeholder="lieu"
            required
            {...getInputProps("lieu")}
          />

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

export default FormulaireSalle;
