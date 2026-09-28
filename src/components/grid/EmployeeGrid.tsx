import { useMemo, useRef, useState, useCallback } from "react";
import {
  Stack,
  Flex,
  Box,
  Group,
  Button,
  ActionIcon,
  CloseButton,
  Badge,
  Text,
  TextInput,
  Select,
  Paper,
  VisuallyHidden,
} from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, RowSelectionOptions } from "ag-grid-community";
import { Search, Filter, FilterX, X, Star } from "lucide-react";
import { AvatarCellRenderer } from "./AvatarCellRenderer";
import { StatusBadgeRenderer } from "./StatusBadgeRenderer";
import { SkillsCellRenderer } from "./SkillsCellRenderer";
import { ActionButtonsRenderer } from "./ActionButtonsRenderer";
import { Employee } from "../../types/employee";
import "../../styles/grid-custom.css";

interface EmployeeGridProps {
  rowData: Employee[];
  onGridReadyCallback?: (params: GridReadyEvent) => void;
  onEdit?: (employee: Employee) => void;
}

export const EmployeeGrid: React.FC<EmployeeGridProps> = ({
  rowData,
  onGridReadyCallback,
  onEdit,
}) => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [hasGridColumnFilters, setHasGridColumnFilters] = useState(false);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: "Employee",
        valueGetter: (params) =>
          `${params.data?.firstName || ""} ${params.data?.lastName || ""}`,
        cellRenderer: AvatarCellRenderer,
        minWidth: 260,
        flex: 2,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        pinned: "left",
      },
      {
        headerName: "Department",
        field: "department",
        filter: true,
        minWidth: 140,
        flex: 1,
      },
      {
        headerName: "Position",
        field: "position",
        filter: true,
        minWidth: 180,
        flex: 1.4,
      },
      {
        headerName: "Status",
        field: "isActive",
        cellRenderer: StatusBadgeRenderer,
        minWidth: 120,
        flex: 0.9,
      },
      {
        headerName: "Skills",
        field: "skills",
        cellRenderer: SkillsCellRenderer,
        valueFormatter: (params) => (Array.isArray(params.value) ? params.value.join(", ") : ""),
        minWidth: 220,
        flex: 1.6,
        sortable: false,
      },
      {
        headerName: "Salary",
        field: "salary",
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => {
          return params.value != null
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(params.value)
            : "-";
        },
        minWidth: 130,
        flex: 1,
      },
      {
        headerName: "Performance",
        field: "performanceRating",
        filter: "agNumberColumnFilter",
        cellRenderer: (params: { value?: number }) => (
          <Flex
            align="center"
            gap={4}
            h="100%"
            aria-label={`Performance rating: ${params.value?.toFixed(1) || 0} out of 5 stars`}
          >
            <Star size={13} fill="#f59e0b" color="#f59e0b" aria-hidden="true" />
            <Text size="sm" fw={500}>
              {params.value != null ? Number(params.value).toFixed(1) : "-"}
            </Text>
          </Flex>
        ),
        minWidth: 130,
        flex: 0.9,
      },
      {
        headerName: "Projects",
        field: "projectsCompleted",
        filter: "agNumberColumnFilter",
        cellRenderer: (params: { value?: number }) => (
          <Flex align="center" h="100%">
            <Badge
              size="lg"
              variant="light"
              color="gray"
              aria-label={`${params.value} projects completed`}
            >
              {params.value}
            </Badge>
          </Flex>
        ),
        minWidth: 110,
        flex: 0.8,
      },
      {
        headerName: "Location",
        field: "location",
        filter: true,
        minWidth: 130,
        flex: 1,
      },
      {
        headerName: "Reports To",
        field: "manager",
        filter: true,
        valueFormatter: (params) => params.value || "None (Executive)",
        minWidth: 150,
        flex: 1.1,
      },
      {
        headerName: "Hire Date",
        field: "hireDate",
        minWidth: 120,
        flex: 0.9,
      },
      {
        headerName: "Actions",
        cellRenderer: ActionButtonsRenderer,
        cellRendererParams: {
          onEdit: (data: Employee) => onEdit && onEdit(data),
        },
        minWidth: 100,
        maxWidth: 110,
        pinned: "right",
        sortable: false,
        filter: false,
      },
    ],
    [onEdit],
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
    }),
    [],
  );

  const rowSelection = useMemo<RowSelectionOptions>(
    () => ({
      mode: "multiRow",
    }),
    [],
  );

  const filteredData = useMemo(() => {
    return rowData.filter((item) => {
      const matchDept =
        selectedDepartment === "All" || item.department === selectedDepartment;
      const matchStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Active" && item.isActive) ||
        (selectedStatus === "Inactive" && !item.isActive);
      return matchDept && matchStatus;
    });
  }, [rowData, selectedDepartment, selectedStatus]);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      if (onGridReadyCallback) {
        onGridReadyCallback(params);
      }
    },
    [onGridReadyCallback],
  );

  const handleFilterChanged = useCallback(() => {
    if (gridRef.current?.api) {
      const isFilterActive = gridRef.current.api.isAnyFilterPresent();
      setHasGridColumnFilters(isFilterActive);
    }
  }, []);

  const clearQuickFilter = () => setQuickFilterText("");
  const clearDepartmentFilter = () => setSelectedDepartment("All");
  const clearStatusFilter = () => setSelectedStatus("All");

  const resetAllFilters = () => {
    setQuickFilterText("");
    setSelectedDepartment("All");
    setSelectedStatus("All");
    if (gridRef.current?.api) {
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.onFilterChanged();
    }
    setHasGridColumnFilters(false);
  };

  const hasAnyFilterActive =
    quickFilterText.trim().length > 0 ||
    selectedDepartment !== "All" ||
    selectedStatus !== "All" ||
    hasGridColumnFilters;

  const departments = [
    "All",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
  ];

  return (
    <Stack gap="xs">
      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {filteredData.length === rowData.length
          ? `Showing all ${rowData.length} employees`
          : `Filtered to ${filteredData.length} of ${rowData.length} employees`}
      </VisuallyHidden>

      <Paper
        withBorder
        p="sm"
        radius="md"
        role="search"
        aria-label="Filter and search employees"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          gap="md"
        >
          <TextInput
            id="employee-search-input"
            aria-label="Search employees by name, position, location, or skill"
            placeholder="Search by name, position, location, skill..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            leftSection={<Search size={16} aria-hidden="true" />}
            rightSection={
              quickFilterText ? (
                <CloseButton
                  size="sm"
                  onClick={clearQuickFilter}
                  aria-label="Clear search input"
                />
              ) : null
            }
            size="sm"
            style={{ flex: 1, maxWidth: 380 }}
          />

          <Group gap="xs" wrap="wrap">
            <Select
              id="dept-filter-select"
              aria-label="Filter by department"
              leftSection={<Filter size={14} aria-hidden="true" />}
              data={departments}
              value={selectedDepartment}
              onChange={(val) => setSelectedDepartment(val || "All")}
              size="xs"
              w={160}
              placeholder="Department"
            />

            <Select
              id="status-filter-select"
              aria-label="Filter by employment status"
              data={[
                { value: "All", label: "All Statuses" },
                { value: "Active", label: "Active Only" },
                { value: "Inactive", label: "Inactive Only" },
              ]}
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val || "All")}
              size="xs"
              w={140}
              placeholder="Status"
            />

            {hasAnyFilterActive && (
              <Button
                variant="light"
                color="red"
                size="xs"
                radius="md"
                onClick={resetAllFilters}
                leftSection={<FilterX size={14} aria-hidden="true" />}
                aria-label="Clear all applied filters"
              >
                Clear Filters
              </Button>
            )}
          </Group>
        </Flex>
      </Paper>

      {hasAnyFilterActive && (
        <Group
          role="region"
          aria-label="Active filters"
          gap="xs"
          px={4}
          wrap="wrap"
        >
          <Text size="xs" c="dimmed" fw={500}>
            Applied filters:
          </Text>

          {quickFilterText.trim() && (
            <Badge
              variant="default"
              size="sm"
              radius="sm"
              rightSection={
                <ActionIcon
                  size={14}
                  variant="transparent"
                  color="gray"
                  onClick={clearQuickFilter}
                  aria-label={`Remove search filter for ${quickFilterText}`}
                >
                  <X size={10} aria-hidden="true" />
                </ActionIcon>
              }
            >
              Search: "{quickFilterText}"
            </Badge>
          )}

          {selectedDepartment !== "All" && (
            <Badge
              variant="default"
              size="sm"
              radius="sm"
              rightSection={
                <ActionIcon
                  size={14}
                  variant="transparent"
                  color="gray"
                  onClick={clearDepartmentFilter}
                  aria-label={`Remove department filter for ${selectedDepartment}`}
                >
                  <X size={10} aria-hidden="true" />
                </ActionIcon>
              }
            >
              Dept: {selectedDepartment}
            </Badge>
          )}

          {selectedStatus !== "All" && (
            <Badge
              variant="default"
              size="sm"
              radius="sm"
              rightSection={
                <ActionIcon
                  size={14}
                  variant="transparent"
                  color="gray"
                  onClick={clearStatusFilter}
                  aria-label={`Remove status filter for ${selectedStatus}`}
                >
                  <X size={10} aria-hidden="true" />
                </ActionIcon>
              }
            >
              Status: {selectedStatus}
            </Badge>
          )}

          {hasGridColumnFilters && (
            <Badge
              variant="default"
              size="sm"
              radius="sm"
              rightSection={
                <ActionIcon
                  size={14}
                  variant="transparent"
                  color="gray"
                  onClick={() => {
                    if (gridRef.current?.api) {
                      gridRef.current.api.setFilterModel(null);
                      gridRef.current.api.onFilterChanged();
                      setHasGridColumnFilters(false);
                    }
                  }}
                  aria-label="Remove column filters"
                >
                  <X size={10} aria-hidden="true" />
                </ActionIcon>
              }
            >
              Column Filters Active
            </Badge>
          )}

          <Button
            variant="subtle"
            color="indigo"
            size="compact-xs"
            onClick={resetAllFilters}
            aria-label="Remove all applied filters"
          >
            Clear all
          </Button>
        </Group>
      )}

      <Box
        role="region"
        aria-label="Employee Directory Data Table"
        tabIndex={0}
        className="ag-theme-quartz"
        w="100%"
        h={560}
        style={{
          borderRadius: "var(--mantine-radius-md)",
          overflow: "hidden",
          border: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <AgGridReact<Employee>
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          rowSelection={rowSelection}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          rowHeight={56}
          headerHeight={46}
          ensureDomOrder={true}
          enableCellTextSelection={true}
          suppressCellFocus={false}
          onGridReady={onGridReady}
          onFilterChanged={handleFilterChanged}
          onRowDoubleClicked={(e) => e.data && onEdit && onEdit(e.data)}
          animateRows={true}
        />
      </Box>
    </Stack>
  );
};
