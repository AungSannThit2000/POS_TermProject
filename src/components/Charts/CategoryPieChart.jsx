import { Card, CardContent, Typography, useTheme } from "@mui/material";import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";import { colorFromKey } from "../../lib/chartColors";
export default function CategoryPieChart({ data }) {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          Sales proportion by category
        </Typography>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={data} dataKey="value" nameKey="name" outerRadius="75%" labelLine={false}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={colorFromKey(entry.name)} stroke={theme.palette.background.paper} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
