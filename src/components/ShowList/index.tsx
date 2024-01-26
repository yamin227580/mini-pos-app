import { CreateDate } from "@/types/typeForAll";
import { config } from "@/utils/config";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ShowList = ({ open, setOpen }: Props) => {
  const [value, setValue] = useState<Dayjs | null>();

  const [date, setDate] = useState<CreateDate>({
    date: "",
  });

  const router = useRouter();

  const handleCreate = async () => {
    const response = await fetch(`${config.apiBaseUrl}/view-each-list`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(date),
    });
    const { totalPrice, filteredData } = await response.json();
    const data = {
      totalPrice: totalPrice,
      filteredData: filteredData,
    };

    try {
      // Use JSON.stringify to convert the array of objects to a valid JSON string
      const filteredDataString = JSON.stringify(data.filteredData);

      router.push({
        pathname: "/note/table",
        query: {
          ...data,
          filteredData: filteredDataString,
        },
      });
    } catch (error) {
      console.error("Error stringifying data:", error);
    }

    setOpen(false);
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ရက်စွဲရွေးပါ</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 3, mt: 2 }}>
              <DatePicker
                label="ဒီနေရာကိုနှိပ်ပါ"
                format="YYYY-MM-DD"
                value={value}
                onChange={(newValue) => {
                  // Extract only YYYY-MM-DD from the date object
                  const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                  setDate({ date: formattedDate });
                  // Do something with the formatted date
                  console.log("Formatted date:", formattedDate);

                  // Set the value in your state
                  setValue(newValue);
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "#402B3A",
                "&:hover": { backgroundColor: "gray" },
              }}
              onClick={handleCreate}
            >
              စာရင်းကြည့်မယ်
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ShowList;
