import { Group, Stack, Text, Avatar } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";
import { Employee } from "../../types/employee";

export const AvatarCellRenderer: React.FC<CustomCellRendererProps<Employee>> = (props) => {
  const { data } = props;
  if (!data) return null;

  const fullName =
    `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Unnamed";
  const initials =
    `${data.firstName?.[0] || ""}${data.lastName?.[0] || ""}`.toUpperCase() ||
    "E";

  return (
    <Group gap="xs" wrap="nowrap" align="center" h="100%">
      <Avatar color="indigo" radius="xl" size="sm">
        {initials}
      </Avatar>
      <Stack gap={0} justify="center">
        <Text size="sm" fw={600} truncate m={0}>
          {fullName}
        </Text>
        <Text
          size="xs"
          c="dimmed"
          truncate
          m={0}
          aria-label={`Email: ${data.email}`}
        >
          {data.email}
        </Text>
      </Stack>
    </Group>
  );
};
