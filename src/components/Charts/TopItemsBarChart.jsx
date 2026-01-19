import { Card, CardContent, Typography } from "@mui/material";import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
export default function TopItemsBarChart({ data }) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          Top 5 selling items (by revenue)
        </Typography>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}