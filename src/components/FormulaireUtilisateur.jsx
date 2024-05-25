import React, { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Container,
  Group,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import * as Yup from "yup";
import { VscRefresh } from "react-icons/vsc";

const userRoles = [
  { name: "Utilisateur", value: "Utilisateur" },
  { label: "Administrateur", value: "Administrateur" },
];
const initialValues = { nom: "", prenom: "", email: "", role: "" };

function FormulaireUtilisateur() {
  useEffect(() => {
    console.log("FormulaireUtilisateur mounded");
    return () => {
      console.log("FormulaireUtilisateur unmounted");
    };
  }, []);

  const userSchema = Yup.object({
    nom: Yup.string().required("Veuillez renseigner ce champ"),
    prenom: Yup.string().nullable(),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("Veuillez renseigner ce champ"),
    role: Yup.string().required("Veuillez renseigner ce champ "),
  });

  const {
    key,
    errors,
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
    validate: yupResolver(userSchema),
  });

  useEffect(() => {
    console.log("values changed", values);
  }, [values]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="my-10">
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <SimpleGrid cols={2}>
            <TextInput
              required
              withAsterisk
              label="Nom"
              placeholder="John"
              {...getInputProps("nom")}
            />
            <TextInput
              label="Prénoms"
              placeholder="Doe"
              {...getInputProps("prenom")}
            />
          </SimpleGrid>
          <TextInput
            required
            label="Email"
            placeholder="reservation@gmail.com"
            {...getInputProps("email")}
          />
          <Select
            data={userRoles}
            placeholder="Choisir rôle"
            {...getInputProps("role")}
            mt={10}
          />
          <Group justify="flex-end" className="mt-24">
            <Button type="button" variant="outline" onClick={reset}>
              <VscRefresh size={25} />
            </Button>
            <Button type="submit">Ajouter</Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
}

export default FormulaireUtilisateur;
