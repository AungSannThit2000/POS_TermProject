import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Alert,
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

export default function SalesJournal() {
  const [transactions, setTransactions] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);

  const [productName, setProductName] = useState(products?.[0]?.itemName || "");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(todayISO());

  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

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
  const category =
    useCustomCategory && customCategory ? customCategory.trim() : product?.category || "unknown";
  const totalPrice = unitPrice * Number(quantity || 0);

  function saveCategory() {
    const next = customCategory.trim();
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

    if (useCustomCategory && !customCategory.trim()) {
      return setError("Custom category is empty.");
    }

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
    setUseCustomCategory(false);
    setCustomCategory("");
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800}>
        Sales Journal
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Card>
        <CardContent>
          <form onSubmit={addTransaction}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={productName}
                    label="Product"
                    onChange={(e) => setProductName(e.target.value)}
                  >
                    {products.map((p) => (
                      <MenuItem key={p.itemName} value={p.itemName}>
                        {p.itemName} (฿{p.unitPrice})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useCustomCategory}
                      onChange={(e) => setUseCustomCategory(e.target.checked)}
                    />
                  }
                  label="Use custom category"
                />
              </Grid>

              {useCustomCategory && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Custom Category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      fullWidth
                      helperText={`Saved categories: ${extraCategories.length}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} alignSelf="center">
                    <Button onClick={saveCategory} variant="outlined">
                      Save Category
                    </Button>
                  </Grid>
                </>
              )}

              <Grid item xs={12} md={4}>
                <Typography variant="body2">Unit Price</Typography>
                <Typography fontWeight={700}>฿{unitPrice}</Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2">Category</Typography>
                <Typography fontWeight={700}>{category}</Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2">Total Price</Typography>
                <Typography fontWeight={700}>฿{totalPrice}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large">
                  Add Transaction
                </Button>
              </Grid>
            </Grid>
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
