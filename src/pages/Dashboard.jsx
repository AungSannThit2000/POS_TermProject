import { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CategoryIcon from "@mui/icons-material/Category";
import AvTimerIcon from "@mui/icons-material/AvTimer";
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

const money = (n) =>
  `$${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [trendMode, setTrendMode] = useState("daily");

  useEffect(() => setTransactions(loadTransactions()), []);

  const totalAllTime = useMemo(() => sumAllTime(transactions), [transactions]);
  const periodTx = useMemo(() => filterByPeriod(transactions, period), [transactions, period]);
  const periodTotal = useMemo(() => sumAllTime(periodTx), [periodTx]);
  const periodCount = periodTx.length;

  const byCategory = useMemo(() => salesByCategory(periodTx), [periodTx]);
  const top5 = useMemo(() => topNProducts(transactions, 5), [transactions]);

  const trendData = useMemo(
    () => (trendMode === "monthly" ? monthlyTrend(transactions) : dailyTrend(transactions)),
    [transactions, trendMode]
  );

  const avgTicket = useMemo(
    () => (periodCount ? periodTotal / periodCount : 0),
    [periodTotal, periodCount]
  );

  const unitsSold = useMemo(
    () => periodTx.reduce((sum, t) => sum + Number(t.quantity || 0), 0),
    [periodTx]
  );

  const bestCategory = useMemo(() => {
    if (!byCategory.length) return null;
    const sorted = [...byCategory].sort((a, b) => b.value - a.value);
    const top = sorted[0];
    const total = sorted.reduce((sum, c) => sum + c.value, 0);
    return { ...top, share: total ? (top.value / total) * 100 : 0 };
  }, [byCategory]);

  const topProduct = top5?.[0];

  return (
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" color="text.secondary" fontWeight={800}>
              Performance overview
            </Typography>
            <Typography variant="h4" fontWeight={900} sx={{ mt: 0.5 }}>
              Dashboard
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
              A cleaner cockpit with richer KPIs, quick filters, and a live theme toggle. Track revenue, volume, and mix in one glance.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" fontWeight={700}>
              Period:
            </Typography>
            <PeriodSelector value={period} onChange={setPeriod} />
          </Stack>
        </Stack>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total sales (all time)"
            value={money(totalAllTime)}
            helper={`${transactions.length} transactions`}
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title={`Sales ${period}`}
            value={money(periodTotal)}
            helper={`${periodCount} orders`}
            tone="secondary"
            icon={<TrendingUpIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Avg order value"
            value={money(avgTicket)}
            helper="Ticket size this period"
            tone="primary"
            icon={<LeaderboardIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Units sold (period)"
            value={unitsSold.toLocaleString()}
            helper="Total quantity"
            tone="secondary"
            icon={<ShoppingBagIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Top product"
            value={topProduct ? topProduct.name : "—"}
            helper={topProduct ? money(topProduct.revenue) : "No data yet"}
            tone="primary"
            icon={<AvTimerIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Hero category"
            value={bestCategory ? bestCategory.name : "—"}
            helper={bestCategory ? `${bestCategory.share.toFixed(1)}% of period sales` : "Add sales to see mix"}
            tone="secondary"
            icon={<CategoryIcon />}
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
              <Typography fontWeight={700}>Trend</Typography>
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

            <Chip
              label={trendMode === "monthly" ? "Rolling monthly totals" : "Recent day-by-day performance"}
              variant="outlined"
              color="primary"
            />
          </Stack>

          <SalesLineChart
            title={trendMode === "monthly" ? "Monthly sales trend" : "Daily sales trend"}
            data={trendData}
          />
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <CategoryPieChart data={byCategory} />
        <TopItemsBarChart data={top5.map((x) => ({ name: x.name, revenue: x.revenue }))} />
      </Box>
    </Stack>
  );
}
