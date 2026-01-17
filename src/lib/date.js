export function toISODate(d) {
  return new Date(d).toISOString().slice(0, 10);
}
export function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
export function startOfWeek(d) {
  const x = startOfDay(d);
  const day = x.getDay();
  return x;
}
export function startOfMonth(d) {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
}