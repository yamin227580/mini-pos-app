import { CreateDataPayload } from "@/types/typeForAll";
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
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import AlertDialog from "../alert";

const defaultData = {
  name: "",
  price: 0,
};

const CreateNote = () => {
  const [data, setData] = useState<CreateDataPayload>(defaultData);
  const [selectData, setSelectData] = useState<Category[]>([]);
  const [selectValue, setSelectValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchSelectData();
  }, []);

  const handleCreate = async () => {
    const response = await fetch(`${config.apiBaseUrl}/create-note`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const dataFromServer = await response.json();
    setData(defaultData);
    setSelectValue("");
    setOpen(true);
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
        onChange={(evt) =>
          setData({ ...data, price: Number(evt.target.value) })
        }
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
    </Box>
  );
};

export default CreateNote;
