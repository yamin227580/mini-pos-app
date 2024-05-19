import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface Props {
  openForNoData: boolean;
  setOpenForNoData: (value: boolean) => void;
}

const AlertForNoData = ({ openForNoData, setOpenForNoData }: Props) => {
  const handleClose = () => {
    setOpenForNoData(false);
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
        <Button onClick={handleClose}>အိုကေ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertForNoData;
