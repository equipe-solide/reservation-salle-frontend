import React from "react";
import { Badge } from "@mantine/core";

function MantineIsDispoBadge({ dispo }) {
  return (
    <Badge color={dispo ? "green" : "red"}>
      {dispo ? "Disponible" : "Indisponible"}
    </Badge>
  );
}

export default MantineIsDispoBadge;
