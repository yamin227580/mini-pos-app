import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface Props {
  openForNotice: boolean;
  setOpenForNotice: (value: boolean) => void;
}

const AlertForValidation = ({ openForNotice, setOpenForNotice }: Props) => {
  const handleClose = () => {
    setOpenForNotice(false);
  };
  return (
    <Dialog open={openForNotice} onClose={handleClose}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "black", fontWeight: "bold", mt: 4, fontSize: "18px" }}
        >
          စျေးနှုန်းတန်ဖိုးကို မြန်မာလိုမရေးပဲ အင်္ဂလိပ်လိုရေးပါ
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>အိုကေ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertForValidation;
