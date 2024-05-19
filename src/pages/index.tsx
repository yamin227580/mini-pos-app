import { config } from "@/utils/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const itemCategories = [
  "ဆံပင်ညှပ်",
  "ရှေ့ညှပ်",
  "ဆံပင်ဖြောင့်",
  "ဆံပင်ကောက်",
  "ခေါင်း‌လျှော်",
  "လျှော်ညှပ်",
  "လျှော်ပေါင်း",
  "စက်ဆွဲ",
  "ဆေးဆိုး",
  "မျက်ခုံးရိတ်",
  "နားဖောက်",
  "မျက်နှာပေါင်းတင်",
  "မျက်နှာဂျီးချွတ်",
  "မိတ်ကပ်လိမ်း",
];

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<string[]>([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [hasCreatedData, setHasCreatedData] = useState(false);

  const createData = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/select-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemCategories),
      });
      const dataFromServer = await response.json();
      setData(dataFromServer);
      setHasCreatedData(true); // Indicate that data creation has completed
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const fetchSelectData = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/select-data`);
      const dataFromServer = await response.json();
      setData(dataFromServer);
      setHasFetchedData(true); // Indicate that data fetching has completed
    } catch (error) {
      setHasFetchedData(true); // Still set to true to prevent blocking the creation in case of an error
    }
  };

  useEffect(() => {
    fetchSelectData();
  }, []);

  useEffect(() => {
    if (hasFetchedData && data.length === 0 && !hasCreatedData) {
      createData();
    }
  }, [hasFetchedData, data.length, hasCreatedData]);

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
            fontSize: 25,
            pt: 2.5,
            fontWeight: "bold",
          }}
        >
          ဆောင်းသရဖူ အလှပြင်ဆိုင်
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
              ဆိုင်ရဲ့ နေ့စဥ်ဝင်ငွေ ထွက်ငွေနှင့် အသုံးစရိတ်များကို လွယ်လွယ်ကူကူ
              လျှင်လျှင်မြန်မြန်နဲ့ စီမံနိုင်ပါသည်။ နေ့စဥ်စာရင်းစုစုပေါင်းကိုလဲ
              ရက်၊လ၊နှစ်အလိုက် အလွယ်တကူကြည့်ရှုနိုင်ပါသည်။
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          width: { xs: "90%", sm: "20%" },
          height: 40,
          pt: 2,
          m: "0 auto",
          borderRadius: 6,
          cursor: "pointer",
          mt: 7,
        }}
        onClick={handleChangeRoute}
      >
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#402B3A",
            ml: { xs: 0, sm: 4 },
            "&:hover": {
              backgroundColor: "gray", // Set the hover color here
            },
          }}
        >
          Go to Home Page
        </Button>
      </Box>
    </Box>
  );
}
