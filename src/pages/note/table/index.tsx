import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { Box } from "@mui/material";
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
  const router = useRouter();
  const { totalPrice, filteredData } = router.query;

  // Check if filteredData is defined before parsing
  const parsedFilteredData =
    typeof filteredData === "string" ? JSON.parse(filteredData) : [];

  const data: List[] = [...parsedFilteredData];

  return (
    <BackofficeLayout>
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
                <StyledTableCell sx={{ fontSize: 18 }}>ရက်စွဲ</StyledTableCell>
                <StyledTableCell sx={{ fontSize: 18 }}>
                  အမျိုးအမည်
                </StyledTableCell>
                <StyledTableCell sx={{ fontSize: 18 }}>
                  စျေးနှုန်း
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "14px" }}
                  >
                    {item.createdAt.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "14px" }}>
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "14px" }}>
                    {item.price.toLocaleString()}
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
              fontSize: 22,
              fontWeight: "bold",
              mt: 2,
            }}
          >
            စုစုပေါင်း ={" "}
            {typeof totalPrice === "string"
              ? Number(totalPrice).toLocaleString()
              : "0"}
          </Box>
        </Box>
      </Box>
    </BackofficeLayout>
  );
};

export default CustomizedTables;
