import { Flex, Button } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import { Pencil } from "lucide-react";
import React from "react";
import { Employee } from "../../types/employee";

interface ActionButtonsRendererParams extends CustomCellRendererProps<Employee> {
  onEdit?: (data: Employee) => void;
}

export const ActionButtonsRenderer: React.FC<ActionButtonsRendererParams> = (props) => {
  const fullName =
    `${props.data?.firstName || ""} ${props.data?.lastName || ""}`.trim() ||
    "employee";

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onEdit && props.data) {
      props.onEdit(props.data);
    }
  };

  return (
    <Flex align="center" justify="center" h="100%">
      <Button
        variant="light"
        color="indigo"
        size="compact-xs"
        radius="sm"
        onClick={handleEditClick}
        leftSection={<Pencil size={12} aria-hidden="true" />}
        aria-label={`Edit details for ${fullName}`}
      >
        Edit
      </Button>
    </Flex>
  );
};
