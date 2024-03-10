import { COLORS } from "../../../utils/constants.tsx";
import { useState } from "react";
import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ICheckoutItem {
  imageUrl: string;
  price: number;
  quantity: number;
  name: string;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CheckoutItem = ({
  imageUrl,
  price,
  quantity,
  name,
  addToCart,
  removeFromCart,
}: ICheckoutItem) => {
  const [hoveredButton, setHoveredButton] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 120,
        width: "100%",
        backgroundColor: "#EDEDF0",
        borderRadius: "10px",
        padding: 1,
        boxSizing: "border-box",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 0.6 }}>
        <Tooltip title={name}>
          <Typography
            sx={{
              lineHeight: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            variant="subtitle1"
            fontWeight={520}
          >
            {name}
          </Typography>
        </Tooltip>
        <Typography
          variant={"subtitle2"}
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {`${price} lei`}
        </Typography>
        <Box sx={{ display: "flex", marginTop: "auto", alignItems: "center" }}>
          <IconButton size="small" onClick={removeFromCart}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton size="small" onClick={addToCart}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <img style={{ flex: 0.4, height: 100, width: 100 }} src={imageUrl} />
    </Box>
  );
};

export default CheckoutItem;
