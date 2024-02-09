import { CreateDataBeforePayload } from "@/types/typeForAll";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Category } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AlertForCreateNoteBefore from "../AlertForCreateNoteBefore";
import AlertDialog from "../alert";
import AlertForValidation from "../alertForValidation";

const defaultData = {
  name: "",
  price: 0,
  customDate: "",
};

const CreateNoteBefore = () => {
  const [data, setData] = useState<CreateDataBeforePayload>(defaultData);
  const [selectData, setSelectData] = useState<Category[]>([]);
  const [selectValue, setSelectValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [openForNotice, setOpenForNotice] = useState<boolean>(false);
  const [openForBefore, setOpenForBefore] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs | null>();

  useEffect(() => {
    fetchSelectData();
  }, []);

  const handleCreate = async () => {
    if (!data.customDate) {
      setOpenForBefore(true);
    } else {
      const response = await fetch(`${config.apiBaseUrl}/create-note`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataFromServer = await response.json();
      setData(defaultData);
      setSelectValue("");
      setValue(null);
      setOpen(true);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setData({ ...data, name: event.target.value });
    setSelectValue(event.target.value);
    setSelectValue("");
  };

  const fetchSelectData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/select-data`);
    const dataFromServer = await response.json();
    setSelectData(dataFromServer);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <DatePicker
          sx={{ width: 300 }}
          label="ရက်စွဲရွေးရန် ဒီနေရာကိုနှိပ်ပါ"
          format="YYYY-MM-DD"
          value={value}
          onChange={(newValue) => {
            // Extract only YYYY-MM-DD from the date object
            const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
            setData({ ...data, customDate: formattedDate });
            // Do something with the formatted date
            console.log("Formatted date:", formattedDate);

            // Set the value in your state
            setValue(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          sx={{ width: 250, mb: 4 }}
          placeholder="အမျိုးအမည်"
          value={data.name}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
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
        sx={{ width: 300, mb: 4 }}
        placeholder="စျေးနှုန်း"
        value={data.price === 0 ? "" : data.price}
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={(evt) => {
          const inputValue = Number(evt.target.value);
          if (!isNaN(inputValue)) {
            setData({ ...data, price: Number(inputValue) });
          } else {
            // Show alert or handle validation error
            setOpenForNotice(true);
          }
        }}
      />

      <Button
        variant="contained"
        sx={{
          fontSize: 18,
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#402B3A",
          "&:hover": { backgroundColor: "gray" },
        }}
        onClick={handleCreate}
      >
        မှတ်မယ်
      </Button>
      <AlertDialog open={open} setOpen={setOpen} />
      <AlertForValidation
        openForNotice={openForNotice}
        setOpenForNotice={setOpenForNotice}
      />
      <AlertForCreateNoteBefore
        openForBefore={openForBefore}
        setOpenForBefore={setOpenForBefore}
      />
    </Box>
  );
};

export default CreateNoteBefore;
