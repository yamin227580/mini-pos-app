import { Box } from "@mui/material";

import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <Topbar />

      <Box sx={{ display: "flex", position: "relative" }}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Sidebar />
        </Box>
        {/* children component */}
        <Box sx={{ width: "100%", height: "100%", pl: 3, pt: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
