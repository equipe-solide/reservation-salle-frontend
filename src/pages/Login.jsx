import React from "react";
import { useNavigate } from "react-router";
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
} from "@mantine/core";

function Login() {
  let navigate = useNavigate();
  return (
    <div className=" h-screen w-screen p-2 sm:p-10 md:p-32 max-md:flex max-md:items-center max-md:justify-center">
      <Container className="w-full lg:w-[600px] bg-gren-500">
        <Title ta="center" >
          Reservation Salle !
        </Title>
        <Text c="dimmed" size="sm" ta="center" my={5}>
          Connectez vous pour commencer{" "}
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@reservation.mg" required />
          <PasswordInput
            label="Mot de passe"
            placeholder="votre mot de passe"
            required
            mt="md"
          />
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
            onClick={() => navigate("/dashboard")}
          >
            Se deconnecter
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
