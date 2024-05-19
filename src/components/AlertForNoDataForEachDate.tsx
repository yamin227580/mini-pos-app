import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  openForNoData: boolean;
  setOpenForNoData: (value: boolean) => void;
}

const AlertForNoDataForEachDate = ({
  openForNoData,
  setOpenForNoData,
}: Props) => {
  const router = useRouter();
  const handleClose = () => {
    setOpenForNoData(false);
    router.push("/note/home");
  };
  return (
    <Dialog open={openForNoData} onClose={handleClose}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "black", fontWeight: "bold", mt: 4, fontSize: "18px" }}
        >
          ဒီရက်စွဲအတွက် စာရင်းမှတ်ထားခြင်း မရှိပါ။
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ပြန်ရွေးမယ်</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertForNoDataForEachDate;
