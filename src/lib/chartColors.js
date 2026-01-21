const PALETTE = [
  "#2563eb", "#16a34a", "#f97316", "#a855f7", "#ef4444",
  "#06b6d4", "#eab308", "#14b8a6", "#f43f5e", "#64748b",
  "#0ea5e9", "#22c55e"];
export function colorFromKey(key) {
  const str = String(key || "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}