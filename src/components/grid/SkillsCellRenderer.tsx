import React from "react";
import { Flex, Group, Badge, Tooltip, Text } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import { Employee } from "../../types/employee";

export const SkillsCellRenderer: React.FC<CustomCellRendererProps<Employee, string[]>> = (props) => {
  const skills = Array.isArray(props.value) ? props.value : [];
  if (skills.length === 0) {
    return (
      <Text size="xs" c="dimmed">
        —
      </Text>
    );
  }

  const visibleSkills = skills.slice(0, 2);
  const remainingSkills = skills.slice(2);

  return (
    <Flex align="center" h="100%">
      <Group gap={4} wrap="nowrap">
        {visibleSkills.map((skill, index) => (
          <Tooltip
            key={index}
            label={skill}
            withArrow
            position="top"
            openDelay={200}
          >
            <Badge
              size="md"
              variant="default"
              radius="sm"
              style={{
                maxWidth: 110,
                textTransform: "none",
                cursor: "default",
              }}
            >
              <Text size="xs" truncate inherit>
                {skill}
              </Text>
            </Badge>
          </Tooltip>
        ))}

        {remainingSkills.length > 0 && (
          <Tooltip
            label={remainingSkills.join(", ")}
            withArrow
            position="top"
            openDelay={200}
          >
            <Badge
              size="md"
              variant="light"
              color="indigo"
              radius="sm"
              style={{ cursor: "pointer", textTransform: "none" }}
            >
              +
            </Badge>
          </Tooltip>
        )}
      </Group>
    </Flex>
  );
};
