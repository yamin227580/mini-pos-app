import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { CreateDate } from "@/types/typeForAll";
import { config } from "@/utils/config";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const AllListPage = () => {
  const [ListForAll, setListForAll] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const [value, setValue] = useState<Dayjs | null>();
  const [valueFrom, setValueFrom] = useState<Dayjs | null>();

  const [date, setDate] = useState<CreateDate>({
    date: "",
  });

  const [dateFrom, setDateFrom] = useState<CreateDate>({
    date: "",
  });

  const sortedEntries = Object.entries(ListForAll).sort(([dateA], [dateB]) => {
    const timestampA = new Date(dateA).getTime();
    const timestampB = new Date(dateB).getTime();
    return timestampA - timestampB;
  });

  // useEffect(() => {
  //   fetchAllLists();
  // }, []);

  const fetchAllLists = async () => {
    const response = await fetch(`${config.apiBaseUrl}/all-list`);
    const { totalPrice, totals } = await response.json();
    setListForAll(totals);
    setTotalPrice(totalPrice);
  };

  const handleAll = () => {
    fetchAllLists();
    setValue(null);
    setValueFrom(null);
    setDate({ date: "" });
    setDateFrom({ date: "" });
  };

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

  const handleClick = async () => {
    const response = await fetch(`${config.apiBaseUrl}/filter-from-all-list`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ date, dateFrom }),
    });
    const { filteredFinalLists, totalPrice } = await response.json();
    setListForAll(filteredFinalLists);
    setTotalPrice(totalPrice);
  };

  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "100vw", sm: 700, margin: "0 auto" },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 26, mb: 5 }}>
            ဝင်ငွေစာရင်းပေါင်းချုပ်
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
            <Typography
              sx={{ mb: 2, fontSize: 18, mr: "5px", textAlign: "center" }}
            >
              မှ
            </Typography>
            <DatePicker
              label="ဒီနေရာနှိပ်ပါ"
              sx={{ width: { xs: "115px", sm: 168 }, height: "30px", mb: 5 }}
              format="YYYY-MM-DD"
              value={value}
              onChange={(newValue) => {
                // Extract only YYYY-MM-DD from the date object
                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                setDate({ date: formattedDate });
                // Do something with the formatted date
                console.log("Formatted date:", formattedDate);

                // Set the value in your state
                setValue(newValue);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ mb: 2, fontSize: 18, mr: "5px", textAlign: "center" }}
            >
              အထိ
            </Typography>
            <DatePicker
              label="ဒီနေရာနှိပ်ပါ"
              sx={{ width: { xs: "115px", sm: 168 }, height: "30px", mb: 5 }}
              format="YYYY-MM-DD"
              value={valueFrom}
              onChange={(newValue) => {
                // Extract only YYYY-MM-DD from the date object
                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                setDateFrom({ date: formattedDate });
                // Do something with the formatted date
                console.log("Formatted date from:", formattedDate);

                // Set the value in your state
                setValueFrom(newValue);
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                mt: 8,
                fontSize: 16,
                cursor: "pointer",
                ml: 1,
              }}
              onClick={handleAll}
            >
              အားလုံး
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: 1,
              mt: 8,
            }}
          >
            <SearchIcon
              sx={{ fontSize: 30, cursor: "pointer" }}
              onClick={handleClick}
            />
            <Typography
              sx={{ cursor: "pointer", fontSize: 15 }}
              onClick={handleClick}
            >
              ရှာမယ်
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <TableContainer
          component={Paper}
          sx={{ width: { xs: "100vw", sm: 700 }, margin: "0 auto", mt: 3 }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontSize: 20 }}>ရက်စွဲ</StyledTableCell>
                <StyledTableCell sx={{ fontSize: 20, textAlign: "right" }}>
                  ရငွေ
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedEntries.map(([date, value]) => (
                // <li key={date}>{`${date}: ${value}`}</li>
                <StyledTableRow key={date}>
                  <StyledTableCell component="th" scope="row">
                    {`${date}`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {typeof value === "number"
                      ? value.toLocaleString()
                      : "Invalid Value"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell
                  sx={{ fontWeight: "bold", textAlign: "right" }}
                >
                  စုစုပေါင်း = {totalPrice.toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </BackofficeLayout>
  );
};

export default AllListPage;
