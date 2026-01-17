export function sumAllTime(transactions) {
  return (transactions || []).reduce((sum, t) => sum + Number(t.totalPrice || 0), 0);
}
export function filterByPeriod(transactions, period) {
  return transactions || [];
}
export function salesByProduct(transactions) {
  return [];
}
export function salesByCategory(transactions) {
  return [];
}
export function topNProducts(transactions, n = 5) {
  return [];
}
export function dailyTrend(transactions) {
  return [];
}
export function monthlyTrend(transactions) {
  return [];
}