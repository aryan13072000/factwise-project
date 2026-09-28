import { useState, useRef, useMemo } from "react";
import { Container, Stack, Grid, Box, Flex, Paper, Text } from "@mantine/core";
import { Users, UserCheck, Award, IndianRupee, CheckCircle2 } from "lucide-react";
import { GridApi } from "ag-grid-community";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { MetricCard } from "./components/dashboard/MetricCard";
import { EmployeeGrid } from "./components/grid/EmployeeGrid";
import { EditEmployeeDrawer } from "./components/drawer/EditEmployeeDrawer";
import { mockEmployees } from "./data/mockEmployees";
import { Employee, KPIStats, NewEmployeePayload } from "./types/employee";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | NewEmployeePayload | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const gridApiRef = useRef<GridApi<Employee> | null>(null);

  const stats = useMemo<KPIStats>(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const avgSalary = Math.round(
      employees.reduce((acc, curr) => acc + (curr.salary || 0), 0) / (total || 1),
    );
    const avgPerf = (
      employees.reduce((acc, curr) => acc + (curr.performanceRating || 0), 0) /
      (total || 1)
    ).toFixed(1);

    return { total, active, avgSalary, avgPerf };
  }, [employees]);

  const handleExportCsv = () => {
    if (gridApiRef.current) {
      gridApiRef.current.exportDataAsCsv({
        fileName: "employee-management-directory.csv",
      });
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      department: "Engineering",
      position: "",
      salary: 800000,
      hireDate: new Date().toISOString().split("T")[0],
      age: 28,
      location: "Bengaluru",
      performanceRating: 4.0,
      projectsCompleted: 0,
      isActive: true,
      skills: ["React"],
      manager: "",
    });
  };

  const handleEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
  };

  const handleSaveEmployee = (savedEmployee: Employee | NewEmployeePayload) => {
    if (savedEmployee.id) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === savedEmployee.id ? (savedEmployee as Employee) : emp,
        ),
      );
      showToast(
        `Updated details for ${savedEmployee.firstName} ${savedEmployee.lastName}`,
      );
    } else {
      const nextId =
        employees.reduce((max, e) => Math.max(max, Number(e.id) || 0), 0) + 1;
      const newEmployee: Employee = {
        ...(savedEmployee as Omit<Employee, "id">),
        id: nextId,
        hireDate:
          savedEmployee.hireDate || new Date().toISOString().split("T")[0],
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      showToast(
        `Added ${newEmployee.firstName} ${newEmployee.lastName} successfully`,
      );
    }
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <Box component="main" bg="gray.0" mih="100vh" py="xl" px="md">
      {notification && (
        <Paper
          withBorder
          shadow="md"
          radius="md"
          p="sm"
          role="status"
          aria-live="polite"
          bg="dark.7"
          c="white"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Flex align="center" gap="xs">
            <CheckCircle2
              size={16}
              color="var(--mantine-color-teal-4)"
              aria-hidden="true"
            />
            <Text size="xs" fw={600} c="white">
              {notification}
            </Text>
          </Flex>
        </Paper>
      )}

      <Container size="xl" px={0}>
        <Stack gap="lg">
          <DashboardHeader
            onAddEmployee={handleAddEmployee}
            onExport={handleExportCsv}
          />

          <Grid gap="md">
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <MetricCard
                title="Total Employees"
                value={stats.total}
                icon={Users}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <MetricCard
                title="Active Workforce"
                value={`${stats.active} / ${stats.total}`}
                icon={UserCheck}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <MetricCard
                title="Average Salary"
                value={`₹${(stats.avgSalary / 100000).toFixed(1)}L`}
                icon={IndianRupee}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <MetricCard
                title="Avg. Rating"
                value={`${stats.avgPerf} / 5.0`}
                icon={Award}
              />
            </Grid.Col>
          </Grid>

          <Box>
            <EmployeeGrid
              rowData={employees}
              onGridReadyCallback={(params) => {
                gridApiRef.current = params.api;
              }}
              onEdit={handleEditEmployee}
            />
          </Box>
        </Stack>
      </Container>

      <EditEmployeeDrawer
        isOpen={Boolean(editingEmployee)}
        employee={editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onSave={handleSaveEmployee}
      />
    </Box>
  );
}
