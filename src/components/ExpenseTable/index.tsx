import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Expense } from "@prisma/client";

interface Props {
  totalPrice: Number;
  expenseDataAll: Expense[];
}

const ExpenseTable = ({ totalPrice, expenseDataAll }: Props) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (!totalPrice && expenseDataAll) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 25, mb: 5, mt: 3 }}>
        အသုံးစရိတ်စာရင်း
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ width: { xs: "100vw", sm: 700 }, margin: "0 auto" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: 18 }}>ရက်စွဲ</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 18 }}>
                အမျိုးအမည်
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: 18 }}>
                စျေးနှုန်း
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseDataAll.map((item) => (
              // <li key={date}>{`${date}: ${value}`}</li>
              <StyledTableRow key={item.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "14px" }}
                >
                  {`${item.createdAt}`}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "14px" }}
                >
                  {`${item.name.toLocaleString()}`}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "14px" }}
                >
                  {`${item.price.toLocaleString()}`}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box width={{ width: "400px", margin: "0 auto" }}>
        <Box
          sx={{ textAlign: "center", fontSize: 22, fontWeight: "bold", mt: 2 }}
        >
          စုစုပေါင်း = {totalPrice.toLocaleString()}
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseTable;
