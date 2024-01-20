import ShowList from "@/components/ShowList";
import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const HomePage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <BackofficeLayout>
      <Box>
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
              fontSize: 18,
              fontWeight: "bold",
              backgroundColor: "#001524",
              "&:hover": { backgroundColor: "gray" },
            }}
            onClick={() => setOpen(true)}
          >
            နေ့စဥ်စာရင်းကြည့်မယ်
          </Button>
        </Box>

        <ShowList open={open} setOpen={setOpen} />
      </Box>
    </BackofficeLayout>
  );
};
export default HomePage;
