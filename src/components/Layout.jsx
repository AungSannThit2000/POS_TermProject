import { AppBar, Box, Container, Toolbar, Typography, Button, Stack } from "@mui/material";import { NavLink } from "react-router-dom";
const linkBtnSx = {
  textTransform: "none",
};
export default function Layout({ children }) {
  return (
    <Box>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1 }}>
            POS Project
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button component={NavLink} to="/dashboard" color="inherit" sx={linkBtnSx}>
              Dashboard
            </Button>
            <Button component={NavLink} to="/journal" color="inherit" sx={linkBtnSx}>
              Sales Journal
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  );
}