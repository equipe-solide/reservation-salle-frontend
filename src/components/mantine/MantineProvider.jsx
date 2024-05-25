import { MantineProvider } from "@mantine/core";
import React from "react";

function MantineProviderComponent({ children }) {
  return <MantineProvider>{children}</MantineProvider>;
}

export default MantineProviderComponent;
