import ItemCard from "@/components/ItemCard";
import BackofficeLayout from "@/components/backofficeLayout/BackofficeLayout";
import { ItemCategoryType } from "@/types/typeForAll";
import { config } from "@/utils/config";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ItemCategoryPage = () => {
  const [itemcategory, setItemCategory] = useState<ItemCategoryType>({});
  const [startDate, setStartDate] = useState<String>("");
  const [lastDate, setLastDate] = useState<String>("");

  useEffect(() => {
    fetchItemCategory();
  }, []);

  const fetchItemCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/create-note`);
    const { itemWithQuantity, startDateString, lastDateString } =
      await response.json();
    setItemCategory(itemWithQuantity);
    setStartDate(startDateString);
    setLastDate(lastDateString);
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
          <Typography
            sx={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}
          >
            စုစုပေါင်းအမျိူးအမည် စာရင်းများ
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 7, mt: 1, textAlign: "center" }}>
            ( {startDate} ရက်နေ့မှ {lastDate} ရက်နေ့အထိ )
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: { xs: "100vw", sm: 700 },
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(itemcategory).map(([key, value]) => {
            if (key === "မိတ်ကပ်လိမ်း") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/makeup.png"}
                />
              );
            }
            if (key === "အမဲဆိုး") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/black-hair.png"}
                />
              );
            }
            if (key === "နားဖောက်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/ear.png"}
                />
              );
            }
            if (key === "ဆေးဆိုး") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-dye.png"}
                />
              );
            }
            if (key === "မျက်ခုံးရိတ်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/eyebrow.png"}
                />
              );
            }
            if (key === "ခေါင်း‌လျှော်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-washing.png"}
                />
              );
            }
            if (key === "ခေါင်း‌လျှော်စက်ဆွဲ") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-washing.png"}
                />
              );
            }
            if (key === "ခေါင်း‌လျှော်စက်ဆွဲ") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-iron.png"}
                />
              );
            }
            if (key === "လျှော်ညှပ်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/w-c.png"}
                />
              );
            }
            if (key === "ဆံပင်ကောက်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/curler.png"}
                />
              );
            }
            if (key === "ဆံပင်ဖြောင့်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-straightener.png"}
                />
              );
            }
            if (key === "အရှေ့ဖြောင့်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-straightener.png"}
                />
              );
            }
            if (key === "ရှေ့ညှပ်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-cut.png"}
                />
              );
            }
            if (key === "ဆံပင်ညှပ်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/haircut.png"}
                />
              );
            }
            if (key === "မျက်နှာဂျီးချွတ်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/face-g.png"}
                />
              );
            }
            if (key === "မျက်နှာပေါင်းတင်") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/face-p.png"}
                />
              );
            }
            if (key === "စက်ဆွဲ") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/hair-iron.png"}
                />
              );
            }
            if (key === "လျှော်ပေါင်း") {
              return (
                <ItemCard
                  itemcategory={itemcategory}
                  key={key}
                  itemKey={key}
                  imageUrl={"/w-p.png"}
                />
              );
            }
          })}

          {/* {Object.keys(itemcategory).map((key) => {
            if (iconObject[key]) {
              return (
                <Card
                  key={itemcategory[key]}
                  sx={{
                    width: 150,
                    height: 150,
                    pb: 8,
                    mb: 5,
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
          })} */}
        </Box>
      </Box>
    </BackofficeLayout>
  );
};
export default ItemCategoryPage;
