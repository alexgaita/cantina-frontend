import { COLORS, SCREENS } from "../../../utils/constants.tsx";
import { useContext, useState } from "react";
import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserContext } from "../../../contexts/UserContext.tsx";

interface ICheckoutItem {
  imageUrl: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  name: string;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CheckoutItem = ({
  imageUrl,
  price,
  discountedPrice,
  quantity,
  name,
  addToCart,
  removeFromCart,
}: ICheckoutItem) => {
  const { selectedScreen } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: selectedScreen === SCREENS.CART ? 140 : 120,
        width: "100%",
        backgroundColor: "#EDEDF0",
        borderRadius: "10px",
        padding: 1,
        boxSizing: "border-box",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxSizing: "border-box",
        }}
      >
        <Tooltip title={name}>
          <Typography
            sx={{
              lineHeight: selectedScreen === SCREENS.CART ? "auto" : 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            variant={selectedScreen === SCREENS.CART ? "h6" : "subtitle1"}
            fontWeight={520}
          >
            {name}
          </Typography>
        </Tooltip>
        <Box display="flex" gap={1}>
          <Typography
            variant={selectedScreen === SCREENS.CART ? "body1" : "subtitle2"}
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {`${discountedPrice} lei`}
          </Typography>
          <Typography
            variant={selectedScreen === SCREENS.CART ? "body1" : "subtitle2"}
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {`\\ ${price} lei`}
          </Typography>
        </Box>

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
      <img
        style={{
          marginRight: selectedScreen === SCREENS.CART ? 10 : 0,
          height: selectedScreen === SCREENS.CART ? 140 : 100,
          width: selectedScreen === SCREENS.CART ? 140 : 100,
        }}
        src={imageUrl}
      />
    </Box>
  );
};

export default CheckoutItem;
