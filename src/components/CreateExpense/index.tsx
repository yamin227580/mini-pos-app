import { CreateExpensePayload } from "@/types/typeForAll";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Expense } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenForAlert: (value: boolean) => void;
  setExpenseDataAll: (value: Expense[]) => void;
  setTotalPrice: (value: number) => void;
}

const defaultData = {
  name: "",
  price: 0,
};

const CreateExpense = ({
  open,
  setOpen,
  setOpenForAlert,
  setExpenseDataAll,
  setTotalPrice,
}: Props) => {
  const [expenseData, setExpenseData] =
    useState<CreateExpensePayload>(defaultData);

  const handleCreate = async () => {
    const response = await fetch(`${config.apiBaseUrl}/expense-list`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(expenseData),
    });
    const { totalPrice, updatedData } = await response.json();
    setExpenseDataAll(updatedData);
    setTotalPrice(totalPrice);
    setOpen(false);
    setExpenseData(defaultData);
    setOpenForAlert(true);
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>အသုံးစရိတ်မှတ်မယ်</DialogTitle>
        <DialogContent sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ width: "100%", mb: 4 }}
              placeholder="အမျိုးအမည်"
              value={expenseData.name}
              onChange={(evt) =>
                setExpenseData({
                  ...expenseData,
                  name: evt.target.value,
                })
              }
            />
            <TextField
              sx={{ width: "100%", mb: 4 }}
              placeholder="စျေးနှုန်း"
              value={expenseData.price === 0 ? "" : expenseData.price}
              onChange={(evt) =>
                setExpenseData({
                  ...expenseData,
                  price: Number(evt.target.value),
                })
              }
            />

            <Button
              variant="contained"
              sx={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "#001524",
                "&:hover": { backgroundColor: "gray" },
              }}
              onClick={handleCreate}
            >
              အခုမှတ်မယ်
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateExpense;
