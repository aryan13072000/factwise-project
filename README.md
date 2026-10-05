# Employee Directory Dashboard with AG Grid & React

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![AG Grid](https://img.shields.io/badge/AG_Grid-v36.2-green.svg)](https://www.ag-grid.com/)
[![Mantine](https://img.shields.io/badge/Mantine_UI-v9-indigo.svg)](https://mantine.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)

An enterprise-grade, high-performance **Employee Management Dashboard** built for client-side tabular data operations using **AG Grid Community v36**, **React 19**, **TypeScript**, and **Mantine UI v9**.

---

## 📖 Complete Documentation
For an exhaustive, file-by-file technical breakdown detailing every function, interface, state variable, and design decision, please refer to:
👉 **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)**

---

## ✨ Features
- **Client-Side AG Grid Engine:** Multi-column sorting, column resizing, full-text quick search, and number column filtering (`agNumberColumnFilter`).
- **External Filter Bar:** Instant dropdown filters by Department and Employment Status, complete with filter tags and a 1-click reset.
- **Custom AG Grid Cell Renderers:**
  - **Employee Identity:** Displays profile avatars with initials fallback, full name, and work email.
  - **Skills Tags:** Pill tags with tooltips and a `+N` overflow counter to prevent column clipping.
  - **Status & Performance:** Color-coded status badges, localized INR currency formatting (`₹`), and star rating indicator.
  - **Action Column:** Pinned edit button per row.
- **Dynamic KPI Cards:** Real-time metrics for Total Employees, Active Workforce, Average Salary, and Average Performance Rating.
- **CRUD Operations:** Slide-over drawer form for adding new employees or editing existing profiles (supporting double-click on any row).
- **Client-Side CSV Export:** Native CSV generation utilizing AG Grid's `exportDataAsCsv()`.
- **Accessibility:** Semantic HTML elements, ARIA labels, polite live region announcements, and keyboard navigability.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/aryan13072000/factwise-project.git
cd factwise-project
git checkout main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture
```
ag-grid-factwise-project/
├── PROJECT_DOCUMENTATION.md           # Exhaustive file-by-file technical manual
├── src/
│   ├── App.tsx                        # Root application coordinator & state
│   ├── main.tsx                       # Module registry & app bootstrap
│   ├── index.css                      # Global styles & Quartz theme variables
│   ├── types/
│   │   └── employee.ts                # TypeScript interfaces (Employee, KPIStats)
│   ├── data/
│   │   └── mockEmployees.ts           # 20-row initial dataset
│   ├── styles/
│   │   └── grid-custom.css            # Custom AG Grid alignment & dividers
│   └── components/
│       ├── dashboard/                 # Header & KPI summary cards
│       ├── drawer/                    # Slide-over Add/Edit employee form
│       └── grid/                      # AG Grid table & custom cell renderers
```

---

## 📄 License
Private project created for FactWise technical evaluation.
