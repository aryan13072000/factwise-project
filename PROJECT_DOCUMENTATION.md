# Comprehensive Codebase Documentation: AG Grid Employee Dashboard

> **Project Name:** `ag-grid-factwise-project`  
> **Tech Stack:** React 19, TypeScript 5+, Vite 8+, AG Grid Community v36, Mantine UI v9, Lucide Icons, Day.js  
> **Repository:** [https://github.com/aryan13072000/factwise-project](https://github.com/aryan13072000/factwise-project)  
> **Branch:** `main`

---

## Table of Contents
1. [Project Overview & Architecture](#1-project-overview--architecture)
2. [Complete Project Directory Tree](#2-complete-project-directory-tree)
3. [Configuration & Environment Files](#3-configuration--environment-files)
   - [package.json](#packagejson)
   - [tsconfig.json](#tsconfigjson)
   - [vite.config.js](#viteconfigjs)
   - [.oxlintrc.json](#oxlintrcjson)
   - [index.html](#indexhtml)
   - [src/vite-env.d.ts](#srcvite-envdts)
4. [Global Styles & Theme Overrides](#4-global-styles--theme-overrides)
   - [src/index.css](#srcindexcss)
   - [src/styles/grid-custom.css](#srcstylesgrid-customcss)
5. [Data Models & Types](#5-data-models--types)
   - [src/types/employee.ts](#srctypesemployeets)
6. [Mock Data Layer](#6-mock-data-layer)
   - [src/data/mockEmployees.ts](#srcdatamockemployeests)
7. [Application Root & Entrypoint](#7-application-root--entrypoint)
   - [src/main.tsx](#srcmaintsx)
   - [src/App.tsx](#srcapptsx)
8. [Dashboard Components](#8-dashboard-components)
   - [src/components/dashboard/DashboardHeader.tsx](#srccomponentsdashboarddashboardheadertsx)
   - [src/components/dashboard/MetricCard.tsx](#srccomponentsdashboardmetriccardtsx)
9. [Grid Components & Custom Cell Renderers](#9-grid-components--custom-cell-renderers)
   - [src/components/grid/EmployeeGrid.tsx](#srccomponentsgridemployeegridtsx)
   - [src/components/grid/AvatarCellRenderer.tsx](#srccomponentsgridavatarcellrenderertsx)
   - [src/components/grid/StatusBadgeRenderer.tsx](#srccomponentsgridstatusbadgerenderertsx)
   - [src/components/grid/SkillsCellRenderer.tsx](#srccomponentsgridskillscellrenderertsx)
   - [src/components/grid/ActionButtonsRenderer.tsx](#srccomponentsgridactionbuttonsrenderertsx)
10. [Form & Modal Layer](#10-form--modal-layer)
    - [src/components/drawer/EditEmployeeDrawer.tsx](#srccomponentsdrawereditemployeedrawertsx)
11. [Data Flow, State Management & Event Handling](#11-data-flow-state-management--event-handling)
12. [How to Setup, Run, and Build](#12-how-to-setup-run-and-build)

---

## 1. Project Overview & Architecture

This project is a high-performance **Employee Management Dashboard** built for client-side tabular data operations using **AG Grid Community v36** integrated into a modern **React 19** and **TypeScript** Single Page Application (SPA).

### Architectural Goals:
- **Client-Side Scalability:** Efficient rendering of records with instant client-side filtering, sorting, column-pinning, and search without server roundtrips.
- **Enterprise UX Design:** Built using **Mantine UI v9** components, Lucide icons, responsive drawer modals, and custom CSS overrides on the AG Grid **Quartz** theme.
- **Strict Typing:** End-to-end TypeScript interfaces covering employees, KPI computations, grid column definitions, and drawer form payloads.
- **Full CRUD Support:** In-memory additions and updates with real-time recalculation of executive KPI summary cards and toast notifications.
- **Native Data Export:** Direct CSV export using AG Grid's client-side Grid API.

---

## 2. Complete Project Directory Tree

```
ag-grid-factwise-project/
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
├── README.md
├── PROJECT_DOCUMENTATION.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── types/
    │   └── employee.ts
    ├── data/
    │   └── mockEmployees.ts
    ├── styles/
    │   └── grid-custom.css
    └── components/
        ├── dashboard/
        │   ├── DashboardHeader.tsx
        │   └── MetricCard.tsx
        ├── drawer/
        │   └── EditEmployeeDrawer.tsx
        └── grid/
            ├── EmployeeGrid.tsx
            ├── AvatarCellRenderer.tsx
            ├── StatusBadgeRenderer.tsx
            ├── SkillsCellRenderer.tsx
            └── ActionButtonsRenderer.tsx
```

---

## 3. Configuration & Environment Files

### `package.json`
- **File Path:** `/package.json`
- **Purpose:** Defines project metadata, npm scripts, runtime dependencies, and development dependencies.
- **Scripts:**
  - `"dev": "vite"`: Launches the local Vite development server with Hot Module Replacement (HMR).
  - `"build": "tsc && vite build"`: Runs the TypeScript compiler (`tsc`) to verify type correctness, then triggers the Vite production build bundler.
  - `"lint": "oxlint"`: Runs Oxlint, an ultra-fast Rust-based linter for React and JavaScript/TypeScript.
  - `"preview": "vite preview"`: Spawns a local HTTP server to preview the production build output from `dist/`.
- **Key Dependencies:**
  - `@mantine/core` (^9.6.3): UI component system (Containers, Grids, Buttons, Inputs, Drawers, Modals, Badges).
  - `@mantine/dates` (^9.6.3): Date picker and calendar component system.
  - `@mantine/hooks` (^9.6.3): Mantine utility and DOM hooks.
  - `ag-grid-community` (^36.2.0): Core AG Grid data grid engine.
  - `ag-grid-react` (^36.2.0): Official React wrapper component for AG Grid.
  - `dayjs` (^1.11.23): Minimalist date manipulation library.
  - `lucide-react` (^1.48.0): Icon library for UI elements.
  - `react` & `react-dom` (^19.2.8): React 19 core library.
- **Key Dev Dependencies:**
  - `@vitejs/plugin-react` (^6.1.1): Vite plugin enabling fast React JSX/TSX compilation and Fast Refresh.
  - `oxlint` (^1.81.0): Rust-based JavaScript/TypeScript linter.
  - `typescript` (^7.0.2): TypeScript language support and compiler.
  - `vite` (^8.3.0): Next-generation frontend build tool and dev server.

---

### `tsconfig.json`
- **File Path:** `/tsconfig.json`
- **Purpose:** Configures the TypeScript compiler (`tsc`) for strict type safety and bundler-compliant module resolution.
- **Key Compiler Options:**
  - `"target": "ES2022"`: Compiles code targeting modern ECMAScript 2022 JavaScript runtimes.
  - `"module": "ESNext"`: Emits modern ES module syntax for Vite to bundle.
  - `"moduleResolution": "bundler"`: Uses modern bundler module resolution rules (compatible with Vite/Webpack 5).
  - `"jsx": "react-jsx"`: Uses the modern React JSX transform without requiring `import React from 'react'` in every file.
  - `"strict": true`: Enables all strict type-checking flags (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, etc.).
  - `"noUnusedLocals": true` & `"noUnusedParameters": true`: Reports errors on unused local variables and parameters.
  - `"noEmit": true`: Disables emitting output files during type-check since Vite handles code emission.
  - `"include": ["src"]`: Restricts compilation and type-checking strictly to the `src/` directory.

---

### `vite.config.js`
- **File Path:** `/vite.config.js`
- **Purpose:** Root Vite configuration file.
- **Code Breakdown:**
  ```javascript
  import react from '@vitejs/plugin-react'
  import { defineConfig } from 'vite'

  export default defineConfig({
    plugins: [react()],
  })
  ```
  - Imports the `@vitejs/plugin-react` plugin.
  - Configures Vite to automatically transform React `.tsx`/`.jsx` files with Fast Refresh.

---

### `.oxlintrc.json`
- **File Path:** `/.oxlintrc.json`
- **Purpose:** Configures Oxlint linter rules.
- **Code Breakdown:**
  - Uses schema `./node_modules/oxlint/configuration_schema.json`.
  - Enables `react` and `oxc` plugins.
  - Configures rules:
    - `"react/rules-of-hooks": "error"`: Enforces React Hooks rules (cannot call hooks conditionally or inside loops).
    - `"react/only-export-components": ["warn", { "allowConstantExport": true }]`: Warns when files export non-component items to protect Fast Refresh.

---

### `index.html`
- **File Path:** `/index.html`
- **Purpose:** The Single Page Application (SPA) entry HTML page.
- **Key Details:**
  - Declares `<meta charset="UTF-8" />` and responsive viewport `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
  - Sets browser document title: `<title>Employee Management Dashboard | FactWise</title>`.
  - Preconnects and loads Google Fonts for the **Inter** font family (`weights 400, 500, 600, 700`).
  - Contains the DOM mount node `<div id="root"></div>`.
  - Loads the application entry module: `<script type="module" src="/src/main.tsx"></script>`.

---

### `src/vite-env.d.ts`
- **File Path:** `/src/vite-env.d.ts`
- **Purpose:** Provides TypeScript type definitions for Vite client features, such as `import.meta.env`, asset imports (`.svg`, `.png`), and Vite HMR types.

---

## 4. Global Styles & Theme Overrides

### `src/index.css`
- **File Path:** `/src/index.css`
- **Purpose:** Base CSS reset and AG Grid **Quartz** theme global CSS variable customizations.
- **Code Breakdown:**
  - **Body Reset:**
    - Removes default margin/padding (`margin: 0; padding: 0`).
    - Sets soft background color `#f8fafc` (slate-50) and primary text color `#0f172a` (slate-900).
    - Specifies modern system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...`).
    - Enables font smoothing for crisp text rendering.
  - **AG Grid Quartz Customizations (`.ag-theme-quartz`):**
    - `--ag-font-family`: Inherited from body font.
    - `--ag-font-size: 14px`: Crisp, readable enterprise font sizing.
    - `--ag-header-background-color: #f8fafc`: Clean light grey header bar.
    - `--ag-header-foreground-color: #475569`: Slate-600 header titles.
    - `--ag-border-color: #e2e8f0`: Subdued border borders.
    - `--ag-row-hover-color: #f1f5f9`: Gentle hover highlight.
    - `--ag-selected-row-background-color: #e0e7ff`: Indigo-100 highlight for selected rows.
    - `border-radius: 0.75rem` & `box-shadow`: Modern rounded card appearance.

---

### `src/styles/grid-custom.css`
- **File Path:** `/src/styles/grid-custom.css`
- **Purpose:** Fine-grained custom styling adjustments for AG Grid layout and alignment.
- **Code Breakdown:**
  - **Column Separators:**
    - `--ag-header-column-separator-display: block`: Displays vertical divider lines between grid headers.
    - `--ag-header-column-separator-color: #e2e8f0`: Subtle slate divider color.
    - `--ag-header-column-separator-height: 50%`: Centers dividers vertically for clean design.
  - **Grid Row Height & Density:**
    - `--ag-grid-size: 8px` and `--ag-list-item-height: 36px`.
  - **Header Label Formatting:**
    - Text transformed to uppercase (`text-transform: uppercase`), 13px font size (`0.8125rem`), `letter-spacing: 0.025em`, and font weight `600`.
  - **Cell Centering & Flex Layout:**
    - `.ag-theme-quartz .ag-cell` and `.ag-theme-quartz .ag-cell-value`: Configured with `display: flex !important` and `align-items: center !important` to ensure badges, avatars, star ratings, and action buttons remain vertically centered regardless of column height.

---

## 5. Data Models & Types

### `src/types/employee.ts`
- **File Path:** `/src/types/employee.ts`
- **Purpose:** Central TypeScript interface and type declarations for the entire application.
- **Interfaces & Types:**

#### 1. `interface Employee`
Represents an individual employee record within the organization:
```typescript
export interface Employee {
  id: number;                   // Unique integer identifier (e.g. 1, 2, 3...)
  firstName: string;            // First name (e.g. "John")
  lastName: string;             // Last name (e.g. "Smith")
  email: string;                // Work email (e.g. "john.smith@company.com")
  department: string;           // Department (Engineering, Marketing, Sales, HR, Finance)
  position: string;             // Job title (e.g. "Senior Developer")
  salary: number;               // Annual base compensation in INR (e.g. 950000)
  hireDate: string;             // ISO Date string in "YYYY-MM-DD" format
  age: number;                  // Age in years (e.g. 32)
  location: string;             // City/Work location (e.g. "Bengaluru", "Mumbai")
  performanceRating: number;    // Rating from 1.0 to 5.0 (e.g. 4.2)
  projectsCompleted: number;    // Count of completed projects (e.g. 12)
  isActive: boolean;            // Status flag: true = Active, false = Inactive
  skills: string[];             // Array of skill tags (e.g. ["React", "TypeScript"])
  manager: string | null;       // Manager name, or null if executive level
}
```

#### 2. `interface KPIStats`
Represents aggregated company metrics computed across all employees:
```typescript
export interface KPIStats {
  total: number;       // Total number of employees
  active: number;      // Number of employees with isActive === true
  avgSalary: number;   // Average annual base compensation in INR
  avgPerf: string;     // Average performance rating formatted to 1 decimal place (e.g. "4.2")
}
```

#### 3. `type NewEmployeePayload`
Payload used during employee creation before a permanent ID is assigned:
```typescript
export type NewEmployeePayload = Omit<Employee, "id"> & { id: number | null };
```

---

## 6. Mock Data Layer

### `src/data/mockEmployees.ts`
- **File Path:** `/src/data/mockEmployees.ts`
- **Purpose:** Supplies the initial dataset consisting of 20 realistic employee records for testing and demonstration.
- **Exports:**
  - `export const mockEmployees: Employee[]`
- **Data Composition:**
  - 20 comprehensive records covering 5 departments: `Engineering`, `Marketing`, `Sales`, `HR`, and `Finance`.
  - Locations across Indian tech hubs: `Bengaluru`, `Mumbai`, `Delhi NCR`, `Hyderabad`, and `Pune`.
  - Realistic salaries ranging from ₹550,000 to ₹1,800,000.
  - Active and inactive statuses (e.g., Jessica Moore is `isActive: false`).
  - Executive-level records with `manager: null` (e.g., David Wilson - CTO, Michael Brown - VP Marketing, Jennifer Lee - VP Sales).
  - Array of skill tags per employee (e.g., `["JavaScript", "React", "Node.js"]`, `["AWS", "Docker", "Kubernetes"]`).

---

## 7. Application Root & Entrypoint

### `src/main.tsx`
- **File Path:** `/src/main.tsx`
- **Purpose:** Application bootstrap file that registers AG Grid modules and mounts React into the DOM.
- **Imports:**
  - `StrictMode` from `react`
  - `createRoot` from `react-dom/client`
  - `ModuleRegistry`, `AllCommunityModule` from `ag-grid-community`
  - `MantineProvider` from `@mantine/core`
  - Mantine core and dates styles: `@mantine/core/styles.css`, `@mantine/dates/styles.css`
  - AG Grid styles: `ag-grid-community/styles/ag-grid.css`, `ag-grid-community/styles/ag-theme-quartz.css`
  - Global styles: `./index.css`
  - Root component: `App` from `./App`
- **Key Functions & Execution:**
  - `ModuleRegistry.registerModules([AllCommunityModule])`: Registers all Community modules with AG Grid v36 for modular tree-shaking and runtime performance.
  - `createRoot(rootElement).render(...)`: Mounts the React application wrapped inside `StrictMode` and `<MantineProvider defaultColorScheme="light">`.

---

### `src/App.tsx`
- **File Path:** `/src/App.tsx`
- **Purpose:** The root application component orchestrating global state, KPI computations, CRUD operations, CSV exports, toast notifications, and modal controls.
- **State Hooks:**
  - `employees: Employee[]`: Initialized with `mockEmployees`. Holds the master list of employees.
  - `editingEmployee: Employee | NewEmployeePayload | null`: Holds the currently selected employee for editing or a blank template for adding. Controls the open/close state of `EditEmployeeDrawer`.
  - `notification: string | null`: Stores current toast notification message string.
  - `gridApiRef: useRef<GridApi<Employee> | null>(null)`: Mutable ref holding the AG Grid `GridApi` instance obtained during `onGridReady`.
- **Hooks & Computations:**
  - `stats = useMemo<KPIStats>(() => { ... }, [employees])`:
    - Computes `total`: `employees.length`.
    - Computes `active`: count of employees where `e.isActive === true`.
    - Computes `avgSalary`: arithmetic mean of employee salaries, rounded.
    - Computes `avgPerf`: arithmetic mean of performance ratings formatted to 1 decimal place (`.toFixed(1)`).
- **Handlers & Functions:**
  - `handleExportCsv()`:
    - Calls `gridApiRef.current.exportDataAsCsv({ fileName: "employee-management-directory.csv" })`.
    - Triggers native browser download of the currently visible and filtered grid data.
  - `handleAddEmployee()`:
    - Sets `editingEmployee` with default values (`id: null`, default department "Engineering", salary ₹800,000, current date as `hireDate`, default skills `["React"]`).
    - Opens the drawer in "Add" mode.
  - `handleEditEmployee(emp: Employee)`:
    - Sets `editingEmployee` to the target `Employee` object.
    - Opens the drawer in "Edit" mode with pre-populated fields.
  - `handleSaveEmployee(savedEmployee: Employee | NewEmployeePayload)`:
    - If `savedEmployee.id` exists (Edit Mode): Maps over `employees` and replaces the matching employee by `id`. Displays toast: `"Updated details for [First] [Last]"`.
    - If `savedEmployee.id` is null (Add Mode): Finds the maximum existing ID (`Math.max(...ids) + 1`), assigns new ID, prepends new employee to state (`[newEmployee, ...prev]`). Displays toast: `"Added [First] [Last] successfully"`.
  - `showToast(message: string)`:
    - Sets `notification = message`.
    - Automatically clears the toast after 3,500ms using `setTimeout`.
- **JSX Layout:**
  - Toast banner floating at the bottom-right (`role="status"`, `aria-live="polite"`).
  - `<DashboardHeader>` with Add and Export actions.
  - Responsive 4-column KPI cards grid (`<MetricCard>`).
  - `<EmployeeGrid>` container.
  - `<EditEmployeeDrawer>` side-modal.

---

## 8. Dashboard Components

### `src/components/dashboard/DashboardHeader.tsx`
- **File Path:** `/src/components/dashboard/DashboardHeader.tsx`
- **Purpose:** Top-level header providing screen branding, subtitles, and global action buttons.
- **Props Interface:**
  ```typescript
  interface DashboardHeaderProps {
    onAddEmployee: () => void;
    onExport: () => void;
  }
  ```
- **Component Function:**
  - `export const DashboardHeader: React.FC<DashboardHeaderProps>`
- **Internal Elements:**
  - Indigo `ThemeIcon` displaying Lucide `Users` icon.
  - Primary title `"Employee Directory"` (`order={2}`, `size="h3"`).
  - Subtitle `"Manage organization members, roles, and status"`.
  - "Export CSV" button with `Download` icon (triggers `onExport`).
  - "Add Employee" button with `UserPlus` icon (triggers `onAddEmployee`).

---

### `src/components/dashboard/MetricCard.tsx`
- **File Path:** `/src/components/dashboard/MetricCard.tsx`
- **Purpose:** Reusable summary card component displaying KPI titles, numerical values, and Lucide icons.
- **Props Interface:**
  ```typescript
  interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
  }
  ```
- **Component Function:**
  - `export const MetricCard: React.FC<MetricCardProps>`
- **Internal Elements:**
  - Mantine `Card` with subtle border, shadow, and rounded corners.
  - Small uppercase title (`Text size="xs" fw={600} tt="uppercase" c="dimmed"`).
  - Prominent numerical value (`Title order={3}`).
  - Right-aligned Indigo `ThemeIcon` hosting the dynamic Lucide icon (`size={44}`).

---

## 9. Grid Components & Custom Cell Renderers

### `src/components/grid/EmployeeGrid.tsx`
- **File Path:** `/src/components/grid/EmployeeGrid.tsx`
- **Purpose:** The core data table component integrating **AgGridReact** with custom column definitions, client-side filtering, searching, pagination, and row double-click events.
- **Props Interface:**
  ```typescript
  interface EmployeeGridProps {
    rowData: Employee[];
    onGridReadyCallback?: (params: GridReadyEvent) => void;
    onEdit?: (employee: Employee) => void;
  }
  ```
- **Internal State Hooks:**
  - `quickFilterText: string`: Manages the text typed into the global search bar.
  - `selectedDepartment: string`: Dropdown filter state ("All", "Engineering", "Marketing", etc.).
  - `selectedStatus: string`: Dropdown filter state ("All", "Active", "Inactive").
  - `hasGridColumnFilters: boolean`: Boolean tracking whether any internal AG Grid column header filters are currently applied.
  - `gridRef: useRef<AgGridReact<Employee>>(null)`: Ref for accessing AG Grid API instance directly.
- **Memoized Column Definitions (`columnDefs: ColDef<Employee>[]`):**
  1. **Employee Column:**
     - `pinned: "left"`, `minWidth: 260`, `flex: 2`.
     - `valueGetter`: Combines `firstName` and `lastName`.
     - `cellRenderer`: `AvatarCellRenderer`.
     - `checkboxSelection: true`, `headerCheckboxSelection: true`, `headerCheckboxSelectionFilteredOnly: true`.
  2. **Department Column:**
     - `field: "department"`, `minWidth: 140`, `filter: true`.
  3. **Position Column:**
     - `field: "position"`, `minWidth: 180`, `filter: true`.
  4. **Status Column:**
     - `field: "isActive"`, `cellRenderer`: `StatusBadgeRenderer`.
  5. **Skills Column:**
     - `field: "skills"`, `cellRenderer`: `SkillsCellRenderer`.
     - `valueFormatter`: Converts string array to comma-separated text for quick filter matching and export.
     - `sortable: false`.
  6. **Salary Column:**
     - `field: "salary"`, `filter: "agNumberColumnFilter"`.
     - `valueFormatter`: Uses `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })` to format integers into currency strings (e.g. `₹9,50,000`).
  7. **Performance Column:**
     - `field: "performanceRating"`, `filter: "agNumberColumnFilter"`.
     - Custom inline cellRenderer showing a gold `Star` icon and numerical rating formatted to 1 decimal place.
  8. **Projects Column:**
     - `field: "projectsCompleted"`, `filter: "agNumberColumnFilter"`.
     - Custom cellRenderer rendering a Mantine `Badge` showing the completed project count.
  9. **Location Column:**
     - `field: "location"`, `filter: true`, `minWidth: 130`.
  10. **Reports To Column:**
      - `field: "manager"`, `filter: true`.
      - `valueFormatter`: Displays `"None (Executive)"` if `manager` is null.
  11. **Hire Date Column:**
      - `field: "hireDate"`, `minWidth: 120`.
  12. **Actions Column:**
      - `pinned: "right"`, `minWidth: 100`, `sortable: false`, `filter: false`.
      - `cellRenderer`: `ActionButtonsRenderer` passing `onEdit` callback.
- **Default Column Definition (`defaultColDef`):**
  - `{ sortable: true, filter: true, resizable: true, floatingFilter: false }`.
- **Filtering Logic (`filteredData: Employee[]`):**
  - Uses `useMemo` to filter `rowData` whenever `selectedDepartment` or `selectedStatus` changes.
  - Matches `item.department` with `selectedDepartment` (if not "All").
  - Matches `item.isActive` with `selectedStatus` (if not "All").
- **Grid Event Handlers:**
  - `onGridReady`: Invoked when AG Grid finishes initializing; exposes `GridReadyEvent` to the parent component.
  - `handleFilterChanged`: Calls `gridRef.current.api.isAnyFilterPresent()` to synchronize active filter state.
  - `resetAllFilters()`: Clears `quickFilterText`, resets `selectedDepartment` to "All", resets `selectedStatus` to "All", and resets AG Grid column filters via `api.setFilterModel(null)`.
  - `onRowDoubleClicked`: Triggers `onEdit(event.data)` when a user double-clicks any row in the table.
- **Accessibility & UI Elements:**
  - `<VisuallyHidden aria-live="polite">`: Screen reader live announcements indicating the number of filtered records (e.g., "Filtered to 5 of 20 employees").
  - Filter chips / badges showing active filters with individual "X" clear buttons and a "Clear all" button.
  - Pagination controls built into AG Grid (`paginationPageSize={10}`, selector `[10, 20, 50]`).

---

### `src/components/grid/AvatarCellRenderer.tsx`
- **File Path:** `/src/components/grid/AvatarCellRenderer.tsx`
- **Purpose:** Custom AG Grid cell renderer displaying an avatar with employee initials, full name, and email address.
- **Props:** `CustomCellRendererProps<Employee>`
- **Component Function:**
  - `export const AvatarCellRenderer: React.FC<CustomCellRendererProps<Employee>>`
- **Logic:**
  - Computes `fullName`: `"${firstName} ${lastName}"`.
  - Computes `initials`: `"${firstName[0]}${lastName[0]}".toUpperCase()`.
  - Renders a circular Mantine `Avatar` with color `indigo`.
  - Renders employee's name in bold (`fw={600}`) and email address below in dimmed text (`c="dimmed"`).

---

### `src/components/grid/StatusBadgeRenderer.tsx`
- **File Path:** `/src/components/grid/StatusBadgeRenderer.tsx`
- **Purpose:** Custom cell renderer rendering a styled badge representing employment status.
- **Props:** `CustomCellRendererProps<Employee, boolean>`
- **Component Function:**
  - `export const StatusBadgeRenderer: React.FC<CustomCellRendererProps<Employee, boolean>>`
- **Logic:**
  - Inspects `props.value` (`boolean`).
  - If `true`: Renders a `teal` badge with label `"Active"`.
  - If `false`: Renders a `red` badge with label `"Inactive"`.

---

### `src/components/grid/SkillsCellRenderer.tsx`
- **File Path:** `/src/components/grid/SkillsCellRenderer.tsx`
- **Purpose:** Custom cell renderer that displays skill tags inside grid cells without overflowing.
- **Props:** `CustomCellRendererProps<Employee, string[]>`
- **Component Function:**
  - `export const SkillsCellRenderer: React.FC<CustomCellRendererProps<Employee, string[]>>`
- **Logic:**
  - Retrieves `skills = props.value || []`.
  - If array is empty, renders an em-dash `—`.
  - Slices array:
    - `visibleSkills = skills.slice(0, 2)`: Displays the first 2 skills as individual badges.
    - `remainingSkills = skills.slice(2)`: If more than 2 skills exist, renders an overflow badge labeled `+` with a Mantine `Tooltip` displaying the remaining skills in a comma-separated list on hover.
  - Wraps each visible skill inside a `Tooltip` with text truncation to prevent column clipping.

---

### `src/components/grid/ActionButtonsRenderer.tsx`
- **File Path:** `/src/components/grid/ActionButtonsRenderer.tsx`
- **Purpose:** Custom cell renderer placed in the pinned right column containing the row "Edit" button.
- **Props Interface:**
  ```typescript
  interface ActionButtonsRendererParams extends CustomCellRendererProps<Employee> {
    onEdit?: (data: Employee) => void;
  }
  ```
- **Component Function:**
  - `export const ActionButtonsRenderer: React.FC<ActionButtonsRendererParams>`
- **Logic:**
  - `handleEditClick(e: React.MouseEvent)`: Calls `e.stopPropagation()` to prevent triggering AG Grid row selection, then calls `props.onEdit(props.data)`.
  - Renders a compact Mantine `Button` (`color="indigo"`, `variant="light"`, `size="compact-xs"`) with a Lucide `Pencil` icon.
  - Adds accessible `aria-label="Edit details for [Employee Name]"`.

---

## 10. Form & Modal Layer

### `src/components/drawer/EditEmployeeDrawer.tsx`
- **File Path:** `/src/components/drawer/EditEmployeeDrawer.tsx`
- **Purpose:** Slide-over modal drawer providing a comprehensive, multi-section form to create new employees or edit existing ones.
- **Props Interface:**
  ```typescript
  interface EditEmployeeDrawerProps {
    isOpen: boolean;
    employee: Employee | NewEmployeePayload | null;
    onClose: () => void;
    onSave: (employee: Employee | NewEmployeePayload) => void;
  }
  ```
- **Internal State & Refs:**
  - `formData: Employee | NewEmployeePayload | null`: Local form state cloned from `props.employee`.
  - `newSkillInput: string`: Controlled input state for adding new skill badges.
  - `firstInputRef: useRef<HTMLInputElement>(null)`: Ref attached to the First Name input for auto-focusing when the drawer opens.
- **Component Lifecycle & Effects:**
  - Synchronizes `formData` whenever `props.employee` changes.
  - Focuses `firstInputRef` 100ms after `isOpen` transitions to `true`.
- **Form Sections & Inputs:**
  1. **Personal Information:**
     - First Name (`TextInput`, required)
     - Last Name (`TextInput`, required)
     - Work Email (`TextInput`, type `email`, required)
     - Age (`NumberInput`, min 18, max 80)
     - Location (`TextInput`, with `MapPin` icon)
  2. **Role & Department:**
     - Department (`Select` dropdown: Engineering, Marketing, Sales, HR, Finance)
     - Position Title (`TextInput`, required)
     - Hire Date (`DateInput` from `@mantine/dates`, formatted `YYYY-MM-DD`, with `Calendar` icon and max date constraint set to today)
     - Manager / Reports To (`TextInput`, optional)
     - Employment Status (`Radio.Group`: Active [teal] vs Inactive [red])
  3. **Compensation & Performance:**
     - Salary INR (`NumberInput`, with `₹` prefix, thousand separators `,`, step 25,000)
     - Performance Rating (`NumberInput`, min 1.0, max 5.0, step 0.1, with `Award` icon)
     - Projects Done (`NumberInput`, min 0)
  4. **Skills & Technologies:**
     - Interactive skill tag chip list with delete buttons (`handleRemoveSkill`).
     - Dynamic text input allowing users to type a skill and press **Enter** or **comma (`,`)** to instantly create a new skill badge (`handleAddSkill`).
- **Submission Handler (`handleSubmit`):**
  - Prevents default form submit.
  - Sanitizes and converts numeric fields (`Number(salary)`, `Number(age)`, etc.).
  - Calls `onSave(formData)`.
  - Closes the drawer via `onClose()`.

---

## 11. Data Flow, State Management & Event Handling

The diagram below traces how user actions flow through components and update state:

```
[ User Interaction ]
   │
   ├─► [ Global Search / Dropdown Filter ]
   │       │
   │       ▼
   │   [ EmployeeGrid.tsx ] ──── Filtered in useMemo ────► [ AgGridReact ] renders rows
   │
   ├─► [ Click "Add Employee" in Header ]
   │       │
   │       ▼
   │   [ App.tsx: handleAddEmployee() ] ── Sets editingEmployee template
   │       │
   │       ▼
   │   [ EditEmployeeDrawer.tsx ] opens in "New Record" mode
   │
   ├─► [ Click "Edit" or Double-Click Row ]
   │       │
   │       ▼
   │   [ App.tsx: handleEditEmployee() ] ── Sets editingEmployee with row data
   │       │
   │       ▼
   │   [ EditEmployeeDrawer.tsx ] opens in "Edit" mode
   │
   ├─► [ Save in Drawer ]
   │       │
   │       ▼
   │   [ App.tsx: handleSaveEmployee() ]
   │       ├─► Updates `employees` state array (immutably)
   │       ├─► Automatically triggers `useMemo(stats)` recalculation
   │       ├─► Triggers `showToast()` feedback
   │       └─► Closes drawer
   │
   └─► [ Click "Export CSV" ]
           │
           ▼
       [ App.tsx: handleExportCsv() ] ── Calls `gridApiRef.current.exportDataAsCsv()`
```

---

## 12. How to Setup, Run, and Build

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm (v9+), yarn, or pnpm

### Step-by-Step Commands
```bash
# 1. Clone the repository
git clone https://github.com/aryan13072000/factwise-project.git

# 2. Enter project directory
cd factwise-project

# 3. Check out the main branch
git checkout main

# 4. Install all dependencies
npm install

# 5. Start the Vite development server
npm run dev
```

The application will be running locally at:
👉 **`http://localhost:5173`**

### Building for Production
```bash
# Type-check and create optimized production build in dist/
npm run build

# Preview the production build locally
npm run preview
```

### Running Lint Checks
```bash
npm run lint
```
