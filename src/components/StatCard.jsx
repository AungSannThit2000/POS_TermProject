import { alpha } from "@mui/material/styles";import { Card, CardContent, Stack, Typography, Chip, Box } from "@mui/material";

export default function StatCard({ title, value, helper, tone = "primary", icon = null }) {
  return (
    <Card
      sx={(theme) => ({
        border: "1px solid",
        borderColor: alpha(theme.palette[tone].main, 0.25),
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: "-30% auto auto -25%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: alpha(theme.palette[tone].main, 0.12),
        },
      })}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          {icon && <Box sx={{ color: (t) => t.palette[tone].main }}>{icon}</Box>}
          <Typography variant="body2" color="text.secondary" fontWeight={700}>
            {title}
          </Typography>
        </Stack>

        <Typography variant="h4" fontWeight={900}>
          {value}
        </Typography>

        {helper && (
          <Chip
            label={helper}
            size="small"
            sx={{
              mt: 2,
              backgroundColor: (t) => alpha(t.palette[tone].main, 0.12),
              color: (t) => t.palette[tone].main,
              fontWeight: 700,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
