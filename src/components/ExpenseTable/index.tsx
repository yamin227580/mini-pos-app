import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
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
import { useState } from "react";
import EditExpense from "../EditExpense";

interface Props {
  totalPrice: Number;
  expenseDataAll: Expense[];
  setExpenseDataAll: (value: Expense[]) => void;
  setTotalPrice: (value: Number) => void;
}

const ExpenseTable = ({
  totalPrice,
  expenseDataAll,
  setExpenseDataAll,
  setTotalPrice,
}: Props) => {
  const [idToDelete, setIdToDelete] = useState<Number>();
  const [idToUpdate, setIdToUpdate] = useState<Number>();
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForUpdate, setOpenForUpdate] = useState(false);

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

  const handleClose = () => {
    setOpenForDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/expense-list?id=${idToDelete}`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const { totalPrice, expenseDataUpdated } = await response.json();
      setExpenseDataAll(expenseDataUpdated);
      setTotalPrice(totalPrice);
      setOpenForDelete(false);
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
  };

  if (!totalPrice && expenseDataAll) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography sx={{ fontSize: 22, mb: 5, mt: 3 }}>
        အသုံးစရိတ်စာရင်း
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: { xs: "100vw", sm: 700 },
          margin: "0 auto",
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontSize: 12, pr: 7 }}>
                ရက်စွဲ
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: 12 }}>
                အမျိုးအမည်
              </StyledTableCell>
              <StyledTableCell sx={{ fontSize: 12 }}>
                စျေးနှုန်း
              </StyledTableCell>
              <StyledTableCell>
                <span />
              </StyledTableCell>
              <StyledTableCell>
                <span />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseDataAll.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "12px" }}
                >
                  {`${item.createdAt}`}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "12px" }}
                >
                  {`${item.name.toLocaleString()}`}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "12px" }}
                >
                  {`${item.price.toLocaleString()}`}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  <Box>
                    <Typography
                      onClick={() => {
                        setIdToDelete(item.id);
                        setOpenForDelete(true);
                      }}
                      sx={{ fontSize: "12px", cursor: "pointer" }}
                    >
                      {" "}
                      ဖျက်
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Box>
                    <Typography
                      onClick={() => {
                        setIdToUpdate(item.id);
                        setOpenForUpdate(true);
                      }}
                      sx={{ fontSize: "12px", cursor: "pointer" }}
                    >
                      {" "}
                      ပြင်
                    </Typography>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openForDelete} onClose={handleClose} sx={{ zIndex: 10 }}>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black", fontWeight: "bold", mt: 2, fontSize: "18px" }}
          >
            ဒီစာရင်းကို ဖျက်မှာသေချာလား?
          </DialogContentText>
        </DialogContent>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={handleDelete} sx={{ color: "red" }}>
            ဖျက်မယ်
          </Button>
          <Button onClick={handleClose} sx={{ color: "black" }}>
            မဖျက်တော့ပါ
          </Button>
        </Box>
      </Dialog>

      <EditExpense
        open={openForUpdate}
        setOpen={setOpenForUpdate}
        expenseDataAll={expenseDataAll}
        setExpenseDataAll={setExpenseDataAll}
        idToUpdate={idToUpdate}
        setTotalPrice={setTotalPrice}
      />

      <Box width={{ width: "400px", margin: "0 auto" }}>
        <Box
          sx={{ textAlign: "center", fontSize: 22, fontWeight: "bold", mt: 2 }}
          onClick={() => {
            console.log("Clicked!");
          }}
        >
          စုစုပေါင်း = {totalPrice.toLocaleString()}
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseTable;
