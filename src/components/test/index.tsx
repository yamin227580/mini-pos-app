import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useState } from "react";

const CombinedComponent: React.FC = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectValue(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Enter text"
        value={textValue}
        onChange={handleTextChange}
        variant="outlined"
        margin="normal"
      />

      <Select
        label="Select option"
        value={selectValue}
        onChange={handleSelectChange}
        //variant="outlined"
        //margin="normal"
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </div>
  );
};

export default CombinedComponent;
