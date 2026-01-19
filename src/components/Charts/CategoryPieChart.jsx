import { Card, CardContent, Typography } from "@mui/material";import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
export default function CategoryPieChart({ data }) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          Sales proportion by category
        </Typography>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Tooltip />
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}