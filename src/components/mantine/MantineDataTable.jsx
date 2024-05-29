import React from "react";
import { Table } from "@mantine/core";
import MantineIsDispoBadge from "./MantineIsDispoBadge";

function MantineDataTable({
  ActionComponent,
  tableHeaders,
  tableFields,
  renderers = {}, // Ajout des renderers pour personnaliser les champs
  data,
}) {
  const rows = data?.map((item, index) => (
    <Table.Tr key={index}>
      {tableFields.map((field, fieldIndex) => (
        <Table.Td key={fieldIndex}>
          {renderers[field] // Si un renderer est fourni pour le champ, l'utiliser
            ? renderers[field](item)
            : item[field]}
        </Table.Td>
      ))}
      {ActionComponent && (
        <Table.Td>
          <ActionComponent item={item} />
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <div>
      <Table
        striped
        highlightOnHover
        withRowBorders={false}
        stickyHeader
        stickyHeaderOffset={60}
      >
        <Table.Thead>
          <Table.Tr>
            {tableHeaders.map((header, index) => (
              <Table.Th key={index} className="font-bold text-lg">
                {header}
              </Table.Th>
            ))}
            {ActionComponent && (
              <Table.Th className="font-bold text-lg">Action</Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default MantineDataTable;
