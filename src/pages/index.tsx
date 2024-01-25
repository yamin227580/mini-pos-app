import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleChangeRoute = () => {
    router.push("/note/createList");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{ width: "100%", height: 82, backgroundColor: "#FF9BD2", mb: 3 }}
      >
        <Typography
          sx={{
            textAlign: "center",
            margin: "0 auto",
            fontSize: 27,
            pt: 2.5,
            fontWeight: "bold",
          }}
        >
          Beauty Salon App
        </Typography>
      </Box>

      <Card
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: 370,
          pb: 10,
          m: { sm: "0 auto" },
        }}
      >
        <CardMedia
          sx={{
            height: 200,
            objectFit: "contain",
            pt: 3,
            borderRadius: 5,
          }}
          image={"/landpage.webp"}
          component={"div"}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              mb: 0,
              textAlign: "center",
              mt: 3,
              fontSize: 21,
              fontWeight: "bold",
            }}
          >
            ရရှိနိုင်သော ဝန်ဆောင်မှုများ
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                mt: 4,
                mb: 2,
                ml: 0.4,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              ဆိုင်ရဲ့ နေ့စဥ်ဝင်ငွေ အသုံးစရိတ်များကို လွယ်လွယ်ကူကူ
              လျှင်လျှင်မြန်မြန်နဲ့ စီမံနိုင်ပါသည်။
              နေ့စဥ်ဝင်ငွေစာရင်းစုစုပေါင်းကိုလဲ အလွယ်တကူကြည့်ရှုနိုင်ပါသည်။
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          width: { xs: "90%", sm: "20%" },
          height: 40,
          backgroundColor: "#402B3A",
          pt: 2,
          m: "0 auto",
          borderRadius: 6,
          cursor: "pointer",
          mt: 7,
        }}
        onClick={handleChangeRoute}
      >
        <Typography sx={{ fontSize: 18, color: "white", textAlign: "center" }}>
          အခု စတင်လိုက်ကြရအောင်
        </Typography>
      </Box>
    </Box>
  );
}
