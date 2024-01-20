import CategoryIcon from "@mui/icons-material/Category";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        minWidth: 250,
        backgroundColor: "#495E57",
        borderTopRightRadius: "20px",
        minHeight: "100vh",
      }}
    >
      <List sx={{ p: 0 }}>
        <Link href={"/note/createList"} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <EditNoteIcon sx={{ color: "#E8F6EF", fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 20, color: "#E8F6EF" }}>
                  ဝင်ငွေမှတ်ရန်
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <Link href={"/note/home"} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "#E8F6EF", fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 20, color: "#E8F6EF" }}>
                  နေ့စဥ်ဝင်ငွေစာရင်း
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <Link href={"/note/expense"} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "#E8F6EF", fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 20, color: "#E8F6EF" }}>
                  အသုံးစရိတ်စာရင်း
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <Link href={"/note/item-category"} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon sx={{ color: "#E8F6EF", fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 20, color: "#E8F6EF" }}>
                  အမျိူးအမည်စာရင်း
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <Link href={"/note/allList"} style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon sx={{ color: "#E8F6EF", fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 20, color: "#E8F6EF" }}>
                  စာရင်းချုပ်
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
