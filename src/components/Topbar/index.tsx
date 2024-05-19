import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "../Sidebar";

const Topbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        bgcolor: "#D63484",
        // bgcolor: "#495E57",
      }}
    >
      <Box
        sx={{
          height: 75,
        }}
      >
        <Image src={"/hairstyle.png"} alt="logo" width={110} height={70} />
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography variant="h5" sx={{ color: "#E8F6EF" }}>
          Beauty Saloon POS
        </Typography>
      </Box>

      <Box>
        <IconButton
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon sx={{ fontSize: "30px", color: "#E8F6EF" }} />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Sidebar />
      </Drawer>
    </Box>
  );
};

export default Topbar;
