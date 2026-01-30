import React, { useEffect, useMemo, useState } from "react";import ReactDOM from "react-dom/client";import { BrowserRouter } from "react-router-dom";import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";import { ColorModeContext, createAppTheme } from "./theme";

const STORAGE_KEY = "pos-theme-mode";

function Root() {
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return "light"; // default to bright theme
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, mode), [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
