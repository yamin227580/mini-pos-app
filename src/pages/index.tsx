import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <BackofficeLayout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            margin: "0 auto",
            fontSize: 27,
            fontWeight: "bold",
          }}
        >
          Beauty Salon App
        </Typography>
        <Typography sx={{ mt: 3, textAlign: "center" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde numquam
          nemo ad quam odit quo ratione quod explicabo harum, quae est. Adipisci
          ipsum eius non repellat, sint voluptatum suscipit maxime!
        </Typography>
      </Box>
    </BackofficeLayout>
  );
}
