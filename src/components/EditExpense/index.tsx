import { UpdateExpensePayload } from "@/types/typeForAll";
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
import { useEffect, useState } from "react";

const defaultData = {
  name: "",
  price: 0,
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  idToUpdate: Number | undefined;
  setTotalPrice: (value: Number) => void;
  expenseDataAll: Expense[];
  setExpenseDataAll: (value: Expense[]) => void;
}

const EditExpense = ({
  open,
  setOpen,
  idToUpdate,
  expenseDataAll,
  setExpenseDataAll,
  setTotalPrice,
}: Props) => {
  const [updateExpense, setUpdateExpense] =
    useState<UpdateExpensePayload>(defaultData);

  const currentExpense = expenseDataAll.find((item) => item.id === idToUpdate);
  useEffect(() => {
    if (currentExpense) {
      setUpdateExpense({
        name: currentExpense.name,
        price: currentExpense.price,
      });
    }
  }, [currentExpense]);

  const handleUpdate = async () => {
    const response = await fetch(`${config.apiBaseUrl}/expense-list`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idToUpdate: idToUpdate,
        name: updateExpense.name,
        price: updateExpense.price,
      }),
    });
    const { totalPrice, updatedData } = await response.json();
    setExpenseDataAll(updatedData);
    setTotalPrice(totalPrice);
    setUpdateExpense(defaultData);
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: "center", my: 1, fontWeight: "bold" }}>
          အသုံးစရိတ် ပြင်မယ်
        </DialogTitle>
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
              value={updateExpense.name}
              onChange={(evt) =>
                setUpdateExpense({
                  ...updateExpense,
                  name: evt.target.value,
                })
              }
            />
            <TextField
              sx={{ width: "100%", mb: 4 }}
              placeholder="စျေးနှုန်း"
              value={updateExpense.price === 0 ? "" : updateExpense.price}
              onChange={(evt) =>
                setUpdateExpense({
                  ...updateExpense,
                  price: Number(evt.target.value),
                })
              }
            />

            <Box sx={{ display: "flex" }}>
              <Button
                onClick={() => setOpen(false)}
                sx={{ fontSize: 16, color: "black", fontWeight: "bold", mr: 7 }}
              >
                မပြင်တော့ပါ
              </Button>
              <Button
                onClick={handleUpdate}
                sx={{ fontSize: 16, color: "red", fontWeight: "bold" }}
              >
                ပြင်မယ်
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditExpense;
