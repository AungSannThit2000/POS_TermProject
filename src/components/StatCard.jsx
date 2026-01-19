import { Card, CardContent, Typography } from "@mui/material";
export default function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h5" fontWeight={900}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}