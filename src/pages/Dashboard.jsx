import { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Box
} from "@mui/material";
import { loadTransactions } from "../lib/storage";
import {
  sumAllTime,
  filterByPeriod,
  salesByCategory,
  topNProducts,
  dailyTrend,
  monthlyTrend,
} from "../lib/aggregates";
 
import PeriodSelector from "../components/PeriodSelector";
import StatCard from "../components/StatCard";
import SalesLineChart from "../components/Charts/SalesLineChart";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import TopItemsBarChart from "../components/Charts/TopItemsBarChart";
 
const money = (n) => `฿${Number(n || 0).toFixed(2)}`;
 
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [trendMode, setTrendMode] = useState("daily");
 
  useEffect(() => setTransactions(loadTransactions()), []);
 
  const totalAllTime = useMemo(() => sumAllTime(transactions), [transactions]);
  const periodTx = useMemo(() => filterByPeriod(transactions, period), [transactions, period]);
  const periodTotal = useMemo(() => sumAllTime(periodTx), [periodTx]);
 
  const byCategory = useMemo(() => salesByCategory(periodTx), [periodTx]);
  const top5 = useMemo(() => topNProducts(transactions, 5), [transactions]);
 
  const trendData = useMemo(
    () => (trendMode === "monthly" ? monthlyTrend(transactions) : dailyTrend(transactions)),
    [transactions, trendMode]
  );
 
  return (
<Stack spacing={2}>
<Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2} alignItems="center">
<Typography variant="h4" fontWeight={800}>
          Dashboard
</Typography>
<PeriodSelector value={period} onChange={setPeriod} />
</Stack>
 
      <Grid container spacing={2}>
<Grid item xs={12} md={4}>
<StatCard title="Total sales (all time)" value={money(totalAllTime)} />
</Grid>
<Grid item xs={12} md={4}>
<StatCard title={`Sales summary (${period})`} value={money(periodTotal)} />
</Grid>
<Grid item xs={12} md={4}>
<StatCard title="Transactions (all time)" value={String(transactions.length)} />
</Grid>
</Grid>
 
      <Card>
<CardContent>
<Stack direction="row" gap={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
<Typography fontWeight={700}>Trend:</Typography>
<ToggleButtonGroup
              exclusive
              value={trendMode}
              onChange={(_, v) => v && setTrendMode(v)}
              size="small"
>
<ToggleButton value="daily">Daily</ToggleButton>
<ToggleButton value="monthly">Monthly</ToggleButton>
</ToggleButtonGroup>
</Stack>
 
          <SalesLineChart
            title={trendMode === "monthly" ? "Monthly sales trend" : "Daily sales trend"}
            data={trendData}
          />
</CardContent>
</Card>

<Box sx={{ display: "flex", justifyContent: "center" }}>
  <Grid container spacing={2} sx={{ maxWidth: 1100 }}>
    <Grid item xs={12} md={6}>
      <CategoryPieChart data={byCategory} />
    </Grid>
    <Grid item xs={12} md={6}>
      <TopItemsBarChart data={top5.map((x) => ({ name: x.name, revenue: x.revenue }))} />
    </Grid>
  </Grid></Box>
      
</Stack>
  );
}