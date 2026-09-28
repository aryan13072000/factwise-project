import { Flex, Box, Stack, Group, Button, Title, Text, ThemeIcon } from "@mantine/core";
import { Users, UserPlus, Download } from "lucide-react";
import React from "react";

interface DashboardHeaderProps {
  onAddEmployee: () => void;
  onExport: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAddEmployee,
  onExport,
}) => {
  return (
    <Box
      component="header"
      pb="md"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        justify="space-between"
        gap="md"
      >
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon size={40} radius="md" color="indigo" variant="filled">
            <Users size={20} />
          </ThemeIcon>
          <Stack gap={2}>
            <Title order={2} size="h3" fw={700}>
              Employee Directory
            </Title>
            <Text size="sm" c="dimmed">
              Manage organization members, roles, and status
            </Text>
          </Stack>
        </Group>

        <Group gap="xs">
          <Button
            variant="default"
            size="xs"
            radius="md"
            onClick={onExport}
            leftSection={<Download size={14} aria-hidden="true" />}
            aria-label="Export employee directory as CSV"
          >
            Export CSV
          </Button>
          <Button
            color="indigo"
            size="xs"
            radius="md"
            onClick={onAddEmployee}
            leftSection={<UserPlus size={14} aria-hidden="true" />}
            aria-label="Add new employee"
          >
            Add Employee
          </Button>
        </Group>
      </Flex>
    </Box>
  );
};
