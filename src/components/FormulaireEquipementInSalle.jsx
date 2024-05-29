import React, { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Group,
  Stack,
  Switch,
  TextInput,
  Tooltip,
} from "@mantine/core";
import * as Yup from "yup";
import { VscRefresh } from "react-icons/vsc";
import axios from "axios";
import { Notify } from "notiflix";
import { EQUIPEMENT_API_URL } from "../services/url.room";
import { IoCloseOutline } from "react-icons/io5";

const initialValues = {
  designation: "",
  description: "",
  dispo: true,
};

function FormulaireEquipementInSalle({ refresh, dataToUpdate, roomId }) {
  const equipementSchema = Yup.object({
    designation: Yup.string().required("Veuillez renseigner ce champ"),
    description: Yup.string().required("Veuillez renseigner ce champ "),
    dispo: Yup.bool().required(),
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
    validate: yupResolver(equipementSchema),
  });

  useEffect(() => {
    console.log("data to update ==>", dataToUpdate);
    if (dataToUpdate) {
      let { designation, description, dispo } = dataToUpdate;
      setValues({
        designation,
        description,
        dispo,
      });
    }
  }, [dataToUpdate]);

  const handleAdd = async () => {
    let form = {
      designation: values.designation,
      description: values.description,
      dispo: values.dispo,
      roomId: roomId,
    };
    console.log("form", form);
    await axios
      .post(EQUIPEMENT_API_URL, form)
      .then((res) => {
        reset();
        refresh();
        console.log("res", res);
        if (!res.data.error) {
          Notify.success("L'equipement a été ajouté");
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
      designation: values.designation,
      description: values.description,
      dispo: values.dispo,
    };

    console.log("form to update", form);

    await axios
      .put(`${EQUIPEMENT_API_URL}/${dataToUpdate.id}`, form)
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

  const handleSkip = () => {
    reset();
    refresh();
  };

  return (
    <div className="">
      <form onSubmit={onSubmit(dataToUpdate ? handleUpdate : handleAdd)}>
        <Stack spacing="md">
          <TextInput
            required
            label="Designation"
            placeholder="designation"
            {...getInputProps("designation")}
          />
          <TextInput
            label="Description"
            placeholder="description"
            required
            {...getInputProps("description")}
          />
          <Tooltip label="disponibilité de l'équipement" refProp="rootRef" className="my-5">
            <Switch
              color="green"
              size="xl"
              onLabel="disponible"
              offLabel="non disponible"
              value={values.dispo}
              {...getInputProps("dispo", { type: "checkbox" })}
            />
          </Tooltip>
          <Group justify="end" className="mt-10">
            {dataToUpdate && (
              <Button
                variant="filled"
                type="button"
                bg="dark"
                onClick={handleSkip}
              >
                <IoCloseOutline size={25} />
                Annuler
              </Button>
            )}
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

export default FormulaireEquipementInSalle;
