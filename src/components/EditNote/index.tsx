import { UpdateDataPayload } from "@/types/typeForAll";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Category, List } from "@prisma/client";
import { useEffect, useState } from "react";
import AlertForValidation from "../alertForValidation";

const defaultData = {
  name: "",
  price: 0,
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  idToEdit: number | undefined;
  data: List[];
  setData: (value: List[]) => void;
  setTotalPriceState: (value: string | string[] | undefined) => void;
}

const EditNote = ({
  open,
  setOpen,
  idToEdit,
  data,
  setData,
  setTotalPriceState,
}: Props) => {
  const [dataToUpdate, setDataToUpdate] =
    useState<UpdateDataPayload>(defaultData);
  const [selectData, setSelectData] = useState<Category[]>([]);
  const [selectValue, setSelectValue] = useState("");
  const [openForNotice, setOpenForNotice] = useState<boolean>(false);

  useEffect(() => {
    fetchSelectData();
  }, []);

  const currentData = data.find((item) => item.id === idToEdit);

  useEffect(() => {
    if (currentData) {
      setDataToUpdate({ name: currentData?.name, price: currentData?.price });
    }
  }, [currentData]);

  const handleUpdate = async () => {
    const response = await fetch(`${config.apiBaseUrl}/view-each-list`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idToUpdate: idToEdit,
        name: dataToUpdate.name,
        price: dataToUpdate.price,
        date: currentData?.createdAt,
      }),
    });
    const { totalPrice, updatedData } = await response.json();
    setData(updatedData);
    setTotalPriceState(String(totalPrice));
    setDataToUpdate(defaultData);
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDataToUpdate({ ...dataToUpdate, name: event.target.value });
    setSelectValue(event.target.value);
    setSelectValue("");
  };

  const fetchSelectData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/select-data`);
    const dataFromServer = await response.json();
    setSelectData(dataFromServer);
  };
  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle sx={{ textAlign: "center", my: 1, fontWeight: "bold" }}>
          စာရင်းပြင်မယ်
        </DialogTitle>
        <DialogContent sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                sx={{ width: 250, mb: 4 }}
                placeholder="အမျိုးအမည်"
                value={dataToUpdate.name}
                onChange={(evt) =>
                  setDataToUpdate({ ...dataToUpdate, name: evt.target.value })
                }
              />
              <FormControl fullWidth sx={{ mb: 2, width: 50 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Name"
                  value={selectValue}
                  onChange={handleChange}
                  displayEmpty
                >
                  {selectData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              sx={{ width: 300, mb: 2 }}
              placeholder="စျေးနှုန်း"
              value={dataToUpdate.price === 0 ? "" : dataToUpdate.price}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(evt) => {
                const inputValue = Number(evt.target.value);
                if (!isNaN(inputValue)) {
                  setDataToUpdate({
                    ...dataToUpdate,
                    price: Number(inputValue),
                  });
                } else {
                  // Show alert or handle validation error
                  setOpenForNotice(true);
                }
              }}
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
                sx={{ fontSize: 16, color: "#D63484", fontWeight: "bold" }}
              >
                ပြင်မယ်
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertForValidation
        openForNotice={openForNotice}
        setOpenForNotice={setOpenForNotice}
      />
    </Box>
  );
};

export default EditNote;
