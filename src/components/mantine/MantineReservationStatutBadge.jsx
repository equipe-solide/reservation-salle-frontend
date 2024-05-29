import React from "react";
import { Badge } from "@mantine/core";

function MantineReservationStatutBadge({ status }) {
  const colorStatus =
    status === "confirmé" ? "green" : status === "annulé" ? "red" : "orange";
  return <Badge color={colorStatus}>{status}</Badge>;
}

export default MantineReservationStatutBadge;
