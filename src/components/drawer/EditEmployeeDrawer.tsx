import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Box,
  Flex,
  Stack,
  Grid,
  Group,
  Button,
  CloseButton,
  Text,
  Title,
  TextInput,
  NumberInput,
  Select,
  Radio,
  Badge,
  Avatar,
  Divider,
} from "@mantine/core";
import {
  Save,
  User,
  Briefcase,
  IndianRupee,
  Award,
  MapPin,
  Layers,
  UserPlus,
  Calendar,
} from "lucide-react";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";
import { Employee, NewEmployeePayload } from "../../types/employee";

const departmentsList = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

interface EditEmployeeDrawerProps {
  isOpen: boolean;
  employee: Employee | NewEmployeePayload | null;
  onClose: () => void;
  onSave: (employee: Employee | NewEmployeePayload) => void;
}

export const EditEmployeeDrawer: React.FC<EditEmployeeDrawerProps> = ({
  isOpen,
  employee,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Employee | NewEmployeePayload | null>(null);
  const [newSkillInput, setNewSkillInput] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        skills: Array.isArray(employee.skills) ? [...employee.skills] : [],
      });
    }
  }, [employee]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!formData) return null;

  const handleChange = (field: keyof Employee, value: unknown) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && newSkillInput.trim()) {
      e.preventDefault();
      const trimmed = newSkillInput.trim().replace(/^,|,$/g, "");
      if (trimmed && !formData.skills.includes(trimmed)) {
        setFormData((prev) =>
          prev
            ? {
                ...prev,
                skills: [...prev.skills, trimmed],
              }
            : prev,
        );
      }
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.filter((s) => s !== skillToRemove),
          }
        : prev,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      salary: Number(formData.salary) || 0,
      age: Number(formData.age) || 0,
      performanceRating: Number(formData.performanceRating) || 0,
      projectsCompleted: Number(formData.projectsCompleted) || 0,
    });
    onClose();
  };

  const isAddMode = !formData.id;
  const fullName =
    `${formData.firstName || ""} ${formData.lastName || ""}`.trim();
  const initials =
    `${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`.toUpperCase();

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      position="right"
      size="md"
      withCloseButton={false}
      padding={0}
      aria-labelledby="drawer-title"
      aria-describedby="drawer-description"
      styles={{
        content: { display: "flex", flexDirection: "column", height: "100%" },
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        },
      }}
    >
      <Box
        p="md"
        bg="gray.0"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Flex align="center" justify="space-between">
          <Group gap="sm" wrap="nowrap">
            <Avatar color="indigo" radius="xl" size="md">
              {initials ||
                (isAddMode ? <UserPlus size={18} /> : <User size={18} />)}
            </Avatar>
            <Stack gap={2}>
              <Group gap="xs" align="center">
                <Title order={3} size="h4" fw={700}>
                  {isAddMode ? "Add New Employee" : "Edit Employee Details"}
                </Title>
                <Badge
                  size="xs"
                  variant="light"
                  color={isAddMode ? "indigo" : "gray"}
                >
                  {isAddMode ? "New Record" : `ID: #${formData.id}`}
                </Badge>
              </Group>
              <Text id="drawer-description" size="xs" c="dimmed">
                {isAddMode
                  ? "Enter information to add an employee to the directory"
                  : `Update employee profile for ${fullName || "employee"}`}
              </Text>
            </Stack>
          </Group>

          <CloseButton
            size="md"
            onClick={onClose}
            aria-label="Close edit employee drawer"
          />
        </Flex>
      </Box>

      <Box
        component="form"
        id="edit-employee-form"
        onSubmit={handleSubmit}
        p="md"
        style={{ flex: 1, overflowY: "auto" }}
      >
        <Stack gap="lg">
          <Box>
            <Divider
              label={
                <Group gap={6}>
                  <User size={14} color="var(--mantine-color-indigo-6)" />
                  <Text size="xs" fw={700} tt="uppercase" c="indigo.7">
                    Personal Information
                  </Text>
                </Group>
              }
              labelPosition="left"
              mb="sm"
            />
            <Grid gap="sm">
              <Grid.Col span={6}>
                <TextInput
                  ref={firstInputRef}
                  id="edit-first-name"
                  label="First Name"
                  required
                  size="sm"
                  value={formData.firstName || ""}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  id="edit-last-name"
                  label="Last Name"
                  required
                  size="sm"
                  value={formData.lastName || ""}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  id="edit-email"
                  label="Work Email"
                  type="email"
                  required
                  size="sm"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  id="edit-age"
                  label="Age"
                  min={18}
                  max={80}
                  size="sm"
                  value={formData.age || ""}
                  onChange={(val) => handleChange("age", val)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  id="edit-location"
                  label="Location"
                  leftSection={<MapPin size={14} aria-hidden="true" />}
                  placeholder="e.g. Bengaluru, India"
                  size="sm"
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </Grid.Col>
            </Grid>
          </Box>

          <Box>
            <Divider
              label={
                <Group gap={6}>
                  <Briefcase size={14} color="var(--mantine-color-indigo-6)" />
                  <Text size="xs" fw={700} tt="uppercase" c="indigo.7">
                    Role & Department
                  </Text>
                </Group>
              }
              labelPosition="left"
              mb="sm"
            />
            <Grid gap="sm">
              <Grid.Col span={6}>
                <Select
                  id="edit-department"
                  label="Department"
                  data={departmentsList}
                  size="sm"
                  value={formData.department || "Engineering"}
                  onChange={(val) => handleChange("department", val)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  id="edit-position"
                  label="Position Title"
                  required
                  size="sm"
                  value={formData.position || ""}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  id="edit-hire-date"
                  label="Hire Date"
                  leftSection={<Calendar size={14} aria-hidden="true" />}
                  placeholder="Select hire date"
                  value={
                    formData.hireDate && dayjs(formData.hireDate).isValid()
                      ? dayjs(formData.hireDate).toDate()
                      : null
                  }
                  onChange={(date) =>
                    handleChange(
                      "hireDate",
                      date && dayjs(date).isValid()
                        ? dayjs(date).format("YYYY-MM-DD")
                        : "",
                    )
                  }
                  valueFormat="YYYY-MM-DD"
                  clearable
                  size="sm"
                  maxDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  id="edit-manager"
                  label="Manager / Reports To"
                  placeholder="e.g. Sarah Johnson"
                  size="sm"
                  value={formData.manager || ""}
                  onChange={(e) =>
                    handleChange("manager", e.target.value || null)
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Radio.Group
                  label="Employment Status"
                  size="sm"
                  value={formData.isActive ? "active" : "inactive"}
                  onChange={(val) => handleChange("isActive", val === "active")}
                >
                  <Group mt={6} gap="md">
                    <Radio
                      value="active"
                      label="Active"
                      color="teal"
                      size="xs"
                    />
                    <Radio
                      value="inactive"
                      label="Inactive"
                      color="red"
                      size="xs"
                    />
                  </Group>
                </Radio.Group>
              </Grid.Col>
            </Grid>
          </Box>

          <Box>
            <Divider
              label={
                <Group gap={6}>
                  <IndianRupee size={14} color="var(--mantine-color-indigo-6)" />
                  <Text size="xs" fw={700} tt="uppercase" c="indigo.7">
                    Compensation & Performance
                  </Text>
                </Group>
              }
              labelPosition="left"
              mb="sm"
            />
            <Grid gap="sm">
              <Grid.Col span={4}>
                <NumberInput
                  id="edit-salary"
                  label="Salary (INR)"
                  prefix="₹"
                  thousandSeparator=","
                  step={25000}
                  min={0}
                  size="sm"
                  value={formData.salary ?? ""}
                  onChange={(val) => handleChange("salary", val)}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  id="edit-performance"
                  label="Rating (1-5)"
                  leftSection={
                    <Award size={14} color="#f59e0b" aria-hidden="true" />
                  }
                  min={1}
                  max={5}
                  step={0.1}
                  decimalScale={1}
                  size="sm"
                  value={formData.performanceRating ?? ""}
                  onChange={(val) => handleChange("performanceRating", val)}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  id="edit-projects"
                  label="Projects Done"
                  min={0}
                  size="sm"
                  value={formData.projectsCompleted ?? 0}
                  onChange={(val) => handleChange("projectsCompleted", val)}
                />
              </Grid.Col>
            </Grid>
          </Box>

          <Box>
            <Divider
              label={
                <Group gap={6}>
                  <Layers size={14} color="var(--mantine-color-indigo-6)" />
                  <Text size="xs" fw={700} tt="uppercase" c="indigo.7">
                    Skills & Technologies
                  </Text>
                </Group>
              }
              labelPosition="left"
              mb="sm"
            />
            <Text size="xs" c="dimmed" mb="xs">
              Type a skill and press Enter or comma to add.
            </Text>

            {formData.skills && formData.skills.length > 0 && (
              <Group gap="xs" mb="xs" wrap="wrap">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="light"
                    color="indigo"
                    size="md"
                    radius="sm"
                    rightSection={
                      <CloseButton
                        size="xs"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove skill ${skill}`}
                      />
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </Group>
            )}

            <TextInput
              id="edit-skills-input"
              placeholder="Type skill and press Enter..."
              size="sm"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
            />
          </Box>
        </Stack>
      </Box>

      <Box
        p="md"
        bg="gray.0"
        style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Flex align="center" justify="space-between">
          <Button variant="default" size="xs" radius="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-employee-form"
            color="indigo"
            size="xs"
            radius="md"
            leftSection={
              isAddMode ? (
                <UserPlus size={14} aria-hidden="true" />
              ) : (
                <Save size={14} aria-hidden="true" />
              )
            }
          >
            {isAddMode ? "Add Employee" : "Save Changes"}
          </Button>
        </Flex>
      </Box>
    </Drawer>
  );
};
