import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import CreateNoteBefore from "@/components/CreateNoteBefore";
import { Box, Typography } from "@mui/material";

const CreateNotePage = () => {
  //const [open, setOpen] = useState<boolean>(true);

  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}
          >
            ဝင်ငွေစာရင်းမှတ်ရန်
          </Typography>
          <Typography sx={{ fontSize: 18, textAlign: "center", mt: 1 }}>
            (မမှတ်ခဲ့ရသောနေ့များအတွက်)
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <CreateNoteBefore />
        </Box>
      </Box>
    </BackofficeLayout>
  );
};
export default CreateNotePage;
