import { Card, CardContent, Typography } from "@mui/material";import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
export default function SalesLineChart({ title, data }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          {title}
        </Typography>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={data?.[0]?.month ? "month" : "date"} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={data?.[0]?.month ? "sales" : "sales"} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}