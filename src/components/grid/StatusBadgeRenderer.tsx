import { Flex, Badge } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";
import { Employee } from "../../types/employee";

export const StatusBadgeRenderer: React.FC<CustomCellRendererProps<Employee, boolean>> = (props) => {
  const isActive = Boolean(props.value);
  const statusLabel = isActive ? "Active" : "Inactive";
  const color = isActive ? "teal" : "red";

  return (
    <Flex align="center" h="100%">
      <Badge variant="light" color={color} size="sm">
        {statusLabel}
      </Badge>
    </Flex>
  );
};
