import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import MantineHeader from "./MantineHeader";
import MantineSidebar from "./MantineSidebar";
import { useDisclosure } from "@mantine/hooks";

const MantineAppShell = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <MantineHeader opened={opened} toggle={toggle}/>
      <MantineSidebar/>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MantineAppShell;
