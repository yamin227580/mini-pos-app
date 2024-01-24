import CreateExpense from "@/components/CreateExpense";
import ExpenseTable from "@/components/ExpenseTable";
import AlertDialog from "@/components/alert";
import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { config } from "@/utils/config";
import { Box, Button } from "@mui/material";
import { Expense } from "@prisma/client";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openForAlert, setOpenForAlert] = useState<boolean>(false);
  const [expenseDataAll, setExpenseDataAll] = useState<Expense[]>([]);
  const [totalPrice, setTotalPrice] = useState<Number>(0);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/expense-list`);
    const { totalPrice, updatedData } = await response.json();
    setExpenseDataAll(updatedData);
    setTotalPrice(totalPrice);
  };

  return (
    <BackofficeLayout>
      <Box sx={{ mr: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* button to show CreateMenu's Dialog */}
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              backgroundColor: "#001524",
              "&:hover": { backgroundColor: "gray" },
            }}
            onClick={() => setOpen(true)}
          >
            အသုံးစရိတ်မှတ်မယ်
          </Button>
        </Box>

        <CreateExpense
          open={open}
          setOpen={setOpen}
          setOpenForAlert={setOpenForAlert}
          setExpenseDataAll={setExpenseDataAll}
          setTotalPrice={setTotalPrice}
        />
        <AlertDialog open={openForAlert} setOpen={setOpenForAlert} />
        <ExpenseTable
          totalPrice={totalPrice}
          expenseDataAll={expenseDataAll}
          setExpenseDataAll={setExpenseDataAll}
          setTotalPrice={setTotalPrice}
        />
      </Box>
    </BackofficeLayout>
  );
};
export default HomePage;
