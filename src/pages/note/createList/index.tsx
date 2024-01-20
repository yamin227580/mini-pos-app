import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import CreateNote from "@/components/CreateNote/createNote";
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
          <Typography sx={{ fontSize: 28 }}>မှတ်စုရေးရန်</Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <CreateNote />
        </Box>
      </Box>
    </BackofficeLayout>
  );
};
export default CreateNotePage;
