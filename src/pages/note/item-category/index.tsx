import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { IconCategoryType, ItemCategoryType } from "@/types/typeForAll";
import { config } from "@/utils/config";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ItemCategoryPage = () => {
  const [itemcategory, setItemCategory] = useState<ItemCategoryType>({});

  useEffect(() => {
    fetchItemCategory();
  }, []);

  const iconObject : IconCategoryType= {
    မိတ်ကပ်လိမ်း: "/makeup.png",
    နားဖောက်: "/ear.png",
    ဆေးဆိုး: "/hair-dye.png",
    မျက်ခုံးရိတ်: "/eyebrow.png",
    ခေါင်း‌လျှော်: "/hair-washing.png",
    လျှော်ညှပ်: "/w-c.png",
    ဆံပင်ကောက်: "/curler.png",
    ဆံပင်ဖြောင့်: "/hair-straightener.png",
    ရှေ့ညှပ်: "/hair-cut.png",
    ဆံပင်ညှပ်: "/haircut.png",
    မျက်နှာဂျီးချွတ်: "/face-g.png",
    မျက်နှာပေါင်းတင်: "/face-p.png",
    စက်ဆွဲ: "/hair-iron.png",
    လျှော်ပေါင်း: "/w-p.png",
  };

  const fetchItemCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/create-note`);
    const dataFromServer = await response.json();
    setItemCategory(dataFromServer);
  };

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
        <Box>
          <Typography sx={{ fontSize: 25, mb: 7 }}>အမျိူးအမည်စာရင်း</Typography>
        </Box>
      
        <Box sx={{display:"flex",width:{xs:"100vw",sm:700},flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap"}}>
        {Object.keys(itemcategory).map((key) => {
          if (iconObject[key]) {
            return (
              <Card
                key={key}
                sx={{
                  width: 150,
                  height: 150,
                  pb:8,
                  mb:5
                  }}
               >
              <CardMedia
                sx={{ height: 135, objectFit: "contain" }}
                image={iconObject[key]}
                component={"div"}
              />
            <CardContent>
              <Typography
                gutterBottom
                sx={{ mb: 0, textAlign: "center" }}
              >
                {key}
                
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
                    mt: 0.8,
                    ml: 0.4,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    textAlign: "center",
                    
                  }}
                >
                  {itemcategory[key]}
                </Typography>
              </Box>
            </CardContent>
  </Card>
              );
            }
      // If the key doesn't exist in iconObject, return null or an empty fragment
         return null;
})}

        </Box>
      </Box>
    </BackofficeLayout>
  );
};
export default ItemCategoryPage;
