import { DialogContent, DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AlertDialog = ({ open, setOpen }: Props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black", fontWeight: "bold", mt: 4, fontSize: "18px" }}
          >
            လုပ်ဆောင်ချက် အောင်မြင်ပါသည်
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ပိတ်မယ်</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
