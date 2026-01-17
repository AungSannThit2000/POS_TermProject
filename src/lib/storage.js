const TX_KEY = "sales-transactions-v1";
const EXTRA_CATS_KEY = "extra-categories-v1";

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function loadTransactions() {
  return safeParse(localStorage.getItem(TX_KEY), []);
}

export function saveTransactions(transactions) {
  localStorage.setItem(TX_KEY, JSON.stringify(transactions));
}

export function loadExtraCategories() {
  return safeParse(localStorage.getItem(EXTRA_CATS_KEY), []);
}

export function saveExtraCategories(categories) {
  localStorage.setItem(EXTRA_CATS_KEY, JSON.stringify(categories));
}
