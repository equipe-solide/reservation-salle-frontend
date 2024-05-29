import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
  Modal,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Signup from "../components/Signup";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/images/logo.png";
import axios from "axios";
import { USER_LOGIN_URL } from "../services/url.user";
import { Notify } from "notiflix";
import AuthApi from "../utils/AuthApi";

const initialValues = { email: "", password: "" };

function Login() {
  let navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const loginSchema = Yup.object({
    password: Yup.string().required("Veuillez renseigner ce champ"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("Veuillez renseigner ce champ"),
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
    // validate: yupResolver(loginSchema),
  });

  const handleSubmit = async (values) => {
    let form = {
      email: values.email,
      password: values.password,
    };

    console.log("form", form);
    await axios
      .post(USER_LOGIN_URL, form)
      .then((res) => {
        if (!res.data.error) {
          Notify.success("Bienvenue !");
          navigate("/dashboard");
          window.localStorage.setItem("authToken", JSON.stringify(res.data));
          AuthApi.setup();
          console.log("res", res);
        } else {
          Notify.failure(res.data.error);
        }
      })
      .catch((err) => {
        console.log("error", err);
        Notify.failure("Erreur de l'opération");
      });
  };

  return (
    <div className=" h-screen w-screen p-2 sm:p-10 md:p-32 max-md:flex max-md:items-center max-md:justify-center">
      <Container className="w-full lg:w-[600px] bg-gren-500">
        <Group justify="center" my={10}>
          <img src={logo} className="w-[100px]" />
        </Group>
        <Title
          ta="center"
          className="font-light bg-gradient-to-r from-white via-secondary/35 to-transparent"
        >
          Reservation Salle
        </Title>
        <Text c="dimmed" size="sm" ta="center" my={5}>
          Vous n'avez pas encore de compte?{" "}
          <Anchor size="sm" component="button" onClick={open}>
            Créer un compte
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <TextInput
                label="Email"
                placeholder="you@reservation.mg"
                required
                {...getInputProps("email")}
              />
              <PasswordInput
                label="Mot de passe"
                placeholder="votre mot de passe"
                required
                mt="md"
                {...getInputProps("password")}
              />
            </Stack>
            <Group justify="space-between" mt="xl">
              <Checkbox label="Me souvenir de moi" />
              <Anchor component="button" size="sm">
                Mot de passe oublié ?
              </Anchor>
            </Group>

            <Button
              fullWidth
              mt="xl"
              variant="gradient"
              gradient={{ from: "red", to: "cyan", deg: 90 }}
              type="submit"
            >
              Se connecter
            </Button>
          </form>
        </Paper>
      </Container>
      <Modal opened={opened} onClose={close} title="Créer un compte" size="xl">
        {opened && <Signup />}
      </Modal>
    </div>
  );
}

export default Login;
