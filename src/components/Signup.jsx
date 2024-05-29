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

const userRoles = [
  { name: "Utilisateur", value: "Utilisateur" },
  { label: "Administrateur", value: "Administrateur" },
];
const initialValues = {
  nom: "",
  prenom: "",
  email: "",
  role: null,
  password: "",
};

function Signup() {
  useEffect(() => {
    console.log("Signup mounded");
    return () => {
      console.log("Signup unmounted");
    };
  }, []);

  const userSchema = Yup.object({
    nom: Yup.string().required("Veuillez renseigner ce champ"),
    prenom: Yup.string().nullable(),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("Veuillez renseigner ce champ"),
    role: Yup.string().required("Veuillez renseigner ce champ "),
    password: Yup.string().required("Veuillez renseigner ce champ"),
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
    validate: yupResolver(userSchema),
  });

  useEffect(() => {
    console.log("values changed", values);
  }, [values]);



  const handleSignup = async () => {
    let form = {
      nom: values.nom,
      prenoms: checkInputIfEmpty(values.prenom),
      email: values.email,
      password: values.password,
      role: values.role,
    };

  console.log("form", form);

    await axios
      .post(USER_API_URL, form)
      .then((res) => {
        reset();
        console.log("res", res);
        if(!res.data.error){
          Notify.success("Votre compte a bien été crée");
          navigate("/dashboard");
        }else{
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
      <form onSubmit={onSubmit(handleSignup)}>
        <Group justify="center" className="mb-10">
          <img src={logo} className="w-[100px]" />
        </Group>
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
            mt={10}
            required
            label="Rôle"
            data={userRoles}
            placeholder="Choisir rôle"
            clearable
            {...getInputProps("role")}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="votre mot de passe"
            required
            mt="md"
            {...getInputProps("password")}
          />
          <Group justify="end" className="mt-24">
            <Button type="button" variant="outline" onClick={reset}>
              <VscRefresh size={25} />
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "red", to: "cyan", deg: 90 }}
              type="submit"
            >
              Créer mon compte
            </Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
}

export default Signup;
