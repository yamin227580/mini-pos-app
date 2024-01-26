import EditNote from "@/components/EditNote";
import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { List } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = () => {
  const [data, setData] = useState<List[]>([]);
  const [totalPriceState, setTotalPriceState] = useState<
    string | string[] | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);
  const [openForEdit, setOpenForEdit] = useState<boolean>(false);

  const [idToDelete, setIdToDelete] = useState<number>();
  const [idToEdit, setIdToEdit] = useState<number>();

  const router = useRouter();
  const { totalPrice: totalPriceFromQuery, filteredData } = router.query;

  // Check if filteredData is defined before parsing
  const parsedFilteredData =
    typeof filteredData === "string" ? JSON.parse(filteredData) : [];

  useEffect(() => {
    if (totalPriceFromQuery !== undefined && parsedFilteredData) {
      setTotalPriceState(totalPriceFromQuery);
      setData(parsedFilteredData);
    }
  }, [totalPriceFromQuery]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/view-each-list?id=${idToDelete}&date=${data[0].createdAt}`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const { totalPrice, filteredData } = await response.json();
      setData(filteredData);
      setTotalPriceState(String(totalPrice));
      setOpen(false);
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {data.length > 0 && data[0].createdAt && (
          <Typography sx={{ fontSize: 18, mb: 2, mr: 2 }}>
            ရက်စွဲ : {data[0].createdAt.toLocaleString()}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ width: { xs: "100vw", sm: 700 }, margin: "0 auto" }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontSize: 14 }}>
                  အမျိုးအမည်
                </StyledTableCell>
                <StyledTableCell sx={{ fontSize: 14 }}>
                  စျေးနှုန်း
                </StyledTableCell>
                <StyledTableCell>
                  <span />
                </StyledTableCell>
                <StyledTableCell>
                  <span />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell style={{ fontSize: "12px" }}>
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "12px" }}>
                    {item.price.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "10px" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: 9,
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#D63484",
                        "&:hover": { backgroundColor: "gray" },
                      }}
                      onClick={() => {
                        setIdToDelete(item.id);
                        setOpen(true);
                      }}
                    >
                      ဖျက်မယ်
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "10px" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: 9,
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#402B3A",
                        "&:hover": { backgroundColor: "gray" },
                      }}
                      onClick={() => {
                        setIdToEdit(item.id);
                        setOpenForEdit(true);
                      }}
                    >
                      ပြင်မယ်
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box width={{ width: "400px", margin: "0 auto" }}>
          <Box
            sx={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              mt: 2,
            }}
          >
            စုစုပေါင်း ={" "}
            {typeof totalPriceState === "string"
              ? Number(totalPriceState).toLocaleString()
              : "0"}
          </Box>
        </Box>

        <EditNote
          open={openForEdit}
          setOpen={setOpenForEdit}
          idToEdit={idToEdit}
          data={data}
          setData={setData}
          setTotalPriceState={setTotalPriceState}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black", fontWeight: "bold", mt: 2, fontSize: "18px" }}
          >
            ဒီစာရင်းကို ဖျက်မှာသေချာလား?
          </DialogContentText>
        </DialogContent>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={handleDelete} sx={{ color: "#D63484" }}>
            ဖျက်မယ်
          </Button>
          <Button onClick={handleClose} sx={{ color: "black" }}>
            မဖျက်တော့ပါ
          </Button>
        </Box>
      </Dialog>
    </BackofficeLayout>
  );
};

export default CustomizedTables;
