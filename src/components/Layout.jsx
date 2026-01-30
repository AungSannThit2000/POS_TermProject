import { useContext } from "react";import { alpha } from "@mui/material/styles";import { AppBar, Box, Container, Toolbar, Typography, Button, Stack, IconButton, useTheme, Paper } from "@mui/material";import { NavLink } from "react-router-dom";import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";import { ColorModeContext } from "../theme";

const navBtn = (isActive, theme) => ({
  color: isActive ? theme.palette.primary.contrastText : theme.palette.common.white,
  backgroundColor: isActive ? alpha(theme.palette.common.white, 0.18) : "transparent",
  px: 2,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
});

export default function Layout({ children }) {
  const theme = useTheme();
  const { mode, toggle } = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.mode === "light"
          ? "radial-gradient(circle at 10% 20%, #e0e7ff 0, transparent 30%), radial-gradient(circle at 90% 10%, #cffafe 0, transparent 25%), #f6f7fb"
          : "radial-gradient(circle at 15% 15%, rgba(99,102,241,0.16) 0, transparent 28%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.14) 0, transparent 25%), #0b1220",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.common.white,
          boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Paper
            sx={{
              px: 2.5,
              py: 1.25,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: alpha(theme.palette.common.white, 0.16),
              color: theme.palette.common.white,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "30%",
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
              }}
            >
              P
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} lineHeight={1}>
                POS Term Project
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                dashboard & journal
              </Typography>
            </Box>
          </Paper>

          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <Button
              component={NavLink}
              to="/dashboard"
              style={({ isActive }) => navBtn(isActive, theme)}
              sx={{ px: 2 }}
            >
              Dashboard
            </Button>
            <Button
              component={NavLink}
              to="/journal"
              style={({ isActive }) => navBtn(isActive, theme)}
              sx={{ px: 2 }}
            >
              Sales Journal
            </Button>
            <IconButton
              onClick={toggle}
              sx={{
                color: theme.palette.common.white,
                borderRadius: 12,
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
