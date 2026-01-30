import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Alert,
  Autocomplete,
  Divider,
  Chip,
  Box,
} from "@mui/material";

import products from "../data/products.json";
import {
  loadTransactions,
  saveTransactions,
  loadExtraCategories,
  saveExtraCategories,
} from "../lib/storage";
import TransactionsTable from "../components/TransactionsTable";

const todayISO = () => new Date().toISOString().slice(0, 10);

function SummaryRow({ label, value, highlight = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.25,
        borderRadius: 1.5,
        border: "1px dashed",
        borderColor: (t) => t.palette.divider,
        backgroundColor: (t) => (highlight ? t.palette.action.hover : "transparent"),
        fontWeight: highlight ? 800 : 600,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={highlight ? 900 : 700}>{value}</Typography>
    </Box>
  );
}

export default function SalesJournal() {
  const [transactions, setTransactions] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);

  const [productName, setProductName] = useState(products?.[0]?.itemName || "");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(todayISO());

  const baseCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
    []
  );
  const [categoryInput, setCategoryInput] = useState(baseCategories[0] || "");

  const [error, setError] = useState("");

  useEffect(() => {
    setTransactions(loadTransactions());
    setExtraCategories(loadExtraCategories());
  }, []);

  useEffect(() => saveExtraCategories(extraCategories), [extraCategories]);

  const product = useMemo(
    () => products.find((p) => p.itemName === productName),
    [productName]
  );

  const unitPrice = Number(product?.unitPrice || 0);
  const category = categoryInput?.trim() || product?.category || "unknown";
  const totalPrice = unitPrice * Number(quantity || 0);

  const categoryOptions = useMemo(
    () => Array.from(new Set([...baseCategories, ...extraCategories])).filter(Boolean),
    [baseCategories, extraCategories]
  );

  useEffect(() => {
    if (product?.category) {
      setCategoryInput(product.category);
    }
  }, [productName]);

  function saveCategory() {
    const next = category.trim();
    if (!next) return;
    if (extraCategories.includes(next)) return;
    setExtraCategories((prev) => [...prev, next]);
  }

  function addTransaction(e) {
    e.preventDefault();
    setError("");

    if (!productName) return setError("Please select a product.");
    if (!date) return setError("Please select a date.");
    if (Number(quantity) < 1) return setError("Quantity must be at least 1.");
    if (!category.trim()) return setError("Please choose or type a category.");

    const tx = {
      id: crypto.randomUUID(),
      date,
      productName,
      category,
      quantity: Number(quantity),
      unitPrice,
      totalPrice,
    };

    setTransactions((prev) => {
      const next = [tx, ...prev];
      saveTransactions(next);
      return next;
    });

    setQuantity(1);
    setCategoryInput(product?.category || baseCategories[0] || "");
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800}>
        Sales Journal
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Card>
        <CardContent sx={{ pb: 1 }}>
          <form onSubmit={addTransaction}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Grid container spacing={2} flex={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
                    Transaction details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Product"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    {products.map((p) => (
                      <option key={p.itemName} value={p.itemName}>
                        {p.itemName} (${p.unitPrice})
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField
                    type="number"
                    label="Quantity"
                    fullWidth
                    value={quantity}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") return setQuantity("");
                      const v = Number(raw);
                      setQuantity(Number.isFinite(v) ? Math.max(1, v) : 1);
                    }}
                    inputProps={{ min: 1, step: 1 }}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField
                    type="date"
                    label="Date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    freeSolo
                    options={categoryOptions}
                    value={categoryInput}
                    onInputChange={(_, v) => setCategoryInput(v)}
                    onChange={(_, v) => v && setCategoryInput(v)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        helperText={`Pick saved or type new • Saved: ${extraCategories.length}`}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ height: "100%" }}>
                    <Button variant="outlined" onClick={saveCategory}>
                      Save category
                    </Button>
                    <Chip
                      label={category || "No category yet"}
                      color="primary"
                      variant="outlined"
                      sx={{ borderStyle: "dashed" }}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

              <Stack spacing={1.2} minWidth={{ md: 240 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
                  Quick summary
                </Typography>
                <SummaryRow label="Unit price" value={`$${unitPrice.toFixed(2)}`} />
                <SummaryRow label="Category" value={category || "—"} />
                <SummaryRow label="Total" value={`$${totalPrice.toFixed(2)}`} highlight />
                <Button type="submit" variant="contained" size="large">
                  Add Transaction
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <TransactionsTable
        transactions={transactions}
        onDelete={(id) =>
          setTransactions((prev) => {
            const next = prev.filter((t) => t.id !== id);
            saveTransactions(next);
            return next;
          })
        }
      />
    </Stack>
  );
}
