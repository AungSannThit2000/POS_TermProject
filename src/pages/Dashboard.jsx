import { Stack, Typography, Card, CardContent } from "@mui/material";
export default function Dashboard() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800}>
        Dashboard
      </Typography>

      <Card>
        <CardContent>
          <Typography>WIP: Dashboard summary + charts will be here</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}