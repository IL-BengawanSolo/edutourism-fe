import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/components/utils/AuthProvider";
import App from "./App.jsx";
import ErrorBoundary from "./components/utils/ErrorBoundary.jsx";

// Polyfill performance for Vite HMR & React scheduler (happy-dom, older browsers)
if (typeof window !== "undefined") {
  window.performance = window.performance || {};
  const perf = window.performance;
  if (!perf.now) perf.now = () => Date.now();
  if (!perf.getEntriesByType) perf.getEntriesByType = () => [];
  if (!perf.mark) perf.mark = () => {};
  if (!perf.measure) perf.measure = () => {};
  if (!perf.clearMarks) perf.clearMarks = () => {};
  if (!perf.clearMeasures) perf.clearMeasures = () => {};
  if (!perf.getEntries) perf.getEntries = () => [];
  if (!perf.getEntriesByName) perf.getEntriesByName = () => [];
  // Ensure navigation entry has startTime for Vite client
  const origGetEntriesByType = perf.getEntriesByType.bind(perf);
  perf.getEntriesByType = (type) => {
    const entries = origGetEntriesByType(type);
    if (type === "navigation" && (!entries || entries.length === 0)) {
      return [
        {
          startTime: 0,
          duration: 0,
          entryType: "navigation",
          name: document.URL,
        },
      ];
    }
    return entries;
  };
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
