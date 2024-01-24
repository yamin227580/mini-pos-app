import { ItemCategoryType } from "@/types/typeForAll";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  itemcategory: ItemCategoryType;
  key: string;
  itemKey: string;
  imageUrl: string;
}

const ItemCard = ({ itemcategory, key, itemKey, imageUrl }: Props) => {
  return (
    <Card
      key={itemKey}
      sx={{
        width: 150,
        height: 150,
        pb: 10,
        mb: 5,
      }}
    >
      <CardMedia
        sx={{ height: 135, objectFit: "contain" }}
        image={imageUrl}
        component={"div"}
      />
      <CardContent>
        <Typography gutterBottom sx={{ mb: 0, textAlign: "center" }}>
          {itemKey}
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
            {itemcategory[itemKey]}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
