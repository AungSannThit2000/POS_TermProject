import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Arial", "sans-serif"].join(","),
  },
});
export default theme;