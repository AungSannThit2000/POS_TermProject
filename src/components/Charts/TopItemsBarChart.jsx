import { Card, CardContent, Typography, useTheme } from "@mui/material";import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";import { colorFromKey } from "../../lib/chartColors";
export default function TopItemsBarChart({ data }) {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          Top 5 selling items (by revenue)
        </Typography>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={data} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={colorFromKey(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
