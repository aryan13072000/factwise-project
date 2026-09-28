import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import "./index.css";
import App from "./App";

ModuleRegistry.registerModules([AllCommunityModule]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
);
