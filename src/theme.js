import { createContext } from "react";
import { createTheme, alpha } from "@mui/material/styles";

export const ColorModeContext = createContext({ mode: "light", toggle: () => {} });

const common = {
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["'Plus Jakarta Sans'", "Inter", "system-ui", "Arial", "sans-serif"].join(","),
    fontWeightBold: 800,
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0, variant: "outlined" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: alpha(theme.palette.primary.main, 0.1),
          backgroundImage: "none",
        }),
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700, borderRadius: 14 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
    },
  },
};

const lightPalette = {
  mode: "light",
  primary: { main: "#6366f1" },
  secondary: { main: "#0ea5e9" },
  background: { default: "#f6f7fb", paper: "#ffffff" },
  text: { primary: "#0f172a", secondary: "#475569" },
};

const darkPalette = {
  mode: "dark",
  primary: { main: "#a5b4fc" },
  secondary: { main: "#38bdf8" },
  background: { default: "#0b1220", paper: "#0f172a" },
  text: { primary: "#e2e8f0", secondary: "#cbd5e1" },
};

export function createAppTheme(mode = "light") {
  const palette = mode === "light" ? lightPalette : darkPalette;

  return createTheme({
    ...common,
    palette,
    shadows: [
      "none",
      "0px 8px 30px rgba(99,102,241,0.10)",
      ...Array(23).fill("0px 10px 30px rgba(0,0,0,0.05)"),
    ],
    components: {
      ...common.components,
      MuiCard: {
        ...common.components.MuiCard,
        styleOverrides: {
          root: {
            backgroundImage:
              mode === "light"
                ? "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(14,165,233,0.06))"
                : "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.12))",
          },
        },
      },
    },
  });
}

export default createAppTheme;
