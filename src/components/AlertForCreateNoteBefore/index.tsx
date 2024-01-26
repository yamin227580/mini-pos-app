import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface Props {
  openForBefore: boolean;
  setOpenForBefore: (value: boolean) => void;
}

const AlertForCreateNoteBefore = ({
  openForBefore,
  setOpenForBefore,
}: Props) => {
  const handleClose = () => {
    setOpenForBefore(false);
  };
  return (
    <Dialog open={openForBefore} onClose={handleClose}>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "black", fontWeight: "bold", mt: 4, fontSize: "18px" }}
        >
          ရက်စွဲရွေးရန် လိုပါသေးသည်
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>အိုကေ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertForCreateNoteBefore;
