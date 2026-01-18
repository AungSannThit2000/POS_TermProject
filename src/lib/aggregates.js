import { startOfDay, startOfWeek, startOfMonth, toISODate } from "./date";
export function sumAllTime(transactions) {
  return (transactions || []).reduce((sum, t) => sum + Number(t.totalPrice || 0), 0);
}
export function filterByPeriod(transactions, period) {
  const list = transactions || [];
  const now = new Date();

  if (period === "daily") {
    const s = startOfDay(now).getTime();
    return list.filter((t) => startOfDay(t.date).getTime() === s);
  }

  if (period === "weekly") {
    const s = startOfWeek(now).getTime();
    const e = new Date(startOfWeek(now));
    e.setDate(e.getDate() + 7);
    return list.filter((t) => {
      const time = new Date(t.date).getTime();
      return time >= s && time < e.getTime();
    });
  }

  if (period === "monthly") {
    const s = startOfMonth(now).getTime();
    const e = new Date(startOfMonth(now));
    e.setMonth(e.getMonth() + 1);
    return list.filter((t) => {
      const time = new Date(t.date).getTime();
      return time >= s && time < e.getTime();
    });
  }

  return list;
}
export function salesByProduct(transactions) {
  const map = new Map();
  for (const t of transactions || []) {
    const key = t.productName;
    const prev = map.get(key) || { name: key, revenue: 0, qty: 0 };
    prev.revenue += Number(t.totalPrice || 0);
    prev.qty += Number(t.quantity || 0);
    map.set(key, prev);
  }
  return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
}
export function salesByCategory(transactions) {
  const map = new Map();
  for (const t of transactions || []) {
    const key = t.category;
    map.set(key, (map.get(key) || 0) + Number(t.totalPrice || 0));
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}
export function topNProducts(transactions, n = 5) {
  return salesByProduct(transactions).slice(0, n);
}
export function dailyTrend(transactions) {
  const map = new Map();
  for (const t of transactions || []) {
    const key = toISODate(t.date);
    map.set(key, (map.get(key) || 0) + Number(t.totalPrice || 0));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, sales]) => ({ date, sales }));
}
export function monthlyTrend(transactions) {
  const map = new Map();
  for (const t of transactions || []) {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + Number(t.totalPrice || 0));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, sales]) => ({ month, sales }));
}