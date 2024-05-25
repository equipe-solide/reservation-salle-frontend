import React from "react";
import { AppShell, Burger, Button, Group, Stack } from "@mantine/core";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";

function MantineHeader({ opened, toggle }) {
  return (
    <AppShell.Header>
      <Group
        h="100%"
        px="md"
        justify="space-between"
        className="bg-gradient-to-r from-white via-secondary/35 to-transparent"
      >
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src={logo} className="w-[75px]" />
        </Group>
        <Group>
          <img
            src={avatar}
            className="w-[40px] h-[40px] rounded-full object-cover object-center"
          />
          <Stack gap={0}>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-500">Admin</p>
          </Stack>
          <Button className="bg-red-500 rounded-full hover:bg-red-800 transiton duration-200 ml-5 max-md:hidden">
            Se deconnecter
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

export default MantineHeader;
