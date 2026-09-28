import { Card, Flex, Stack, Text, Title, ThemeIcon } from "@mantine/core";
import { LucideIcon } from "lucide-react";
import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <Card withBorder shadow="xs" padding="lg" radius="md">
      <Flex align="center" justify="space-between">
        <Stack gap={4}>
          <Text size="xs" fw={600} tt="uppercase" c="dimmed">
            {title}
          </Text>
          <Title order={3}>{value}</Title>
        </Stack>
        <ThemeIcon
          size={44}
          radius="md"
          color="indigo"
          variant="light"
          aria-hidden="true"
        >
          <Icon height={20} width={20} />
        </ThemeIcon>
      </Flex>
    </Card>
  );
};
