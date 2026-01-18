import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const money = (n) => `฿${Number(n || 0).toFixed(2)}`;

export default function TransactionsTable({ transactions, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography fontWeight={800}>Transactions</Typography>
          <Typography variant="body2">
            Total: {transactions.length}
          </Typography>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.productName}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell align="right">{t.quantity}</TableCell>
                <TableCell align="right">{money(t.unitPrice)}</TableCell>
                <TableCell align="right">{money(t.totalPrice)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDelete(t.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="body2">No transactions yet.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
