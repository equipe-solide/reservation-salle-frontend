import React from "react";
import { Table } from "@mantine/core";

function MantineDataTable({
  ActionComponent,
  tableHeaders,
  tableFields,
  data,
}) {
  const rows = data?.map((item, index) => (
    <Table.Tr key={index}>
      {tableFields.map((field, fieldIndex) => (
        <Table.Td key={fieldIndex}>{item[field]}</Table.Td>
      ))}
      <Table.Td>
        <ActionComponent item={item} />
      </Table.Td>
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
              <Table.Th key={index} className="font-bold text-lg">{header}</Table.Th>
            ))}
            <Table.Th className="font-bold text-lg">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default MantineDataTable;
