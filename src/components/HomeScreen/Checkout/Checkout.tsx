// interface ICheckout {
//
// }

import { Typography } from "@mui/material";
import { COLORS, DEFAULT_IMAGE_URL } from "../../../utils/constants.tsx";
import CheckoutItem from "../CheckoutItem/CheckoutItem.tsx";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CartItemEntity, MenuItemViewEntity } from "../../../types/entities.ts";
import dayjs from "dayjs";

interface CheckoutProps {
  recalculateCart: () => void;
}

const Checkout = ({ recalculateCart }: CheckoutProps) => {
  const [cartData, setCartData] = useState<CartItemEntity[]>(
    JSON.parse(localStorage.getItem("cartData") || JSON.stringify({ data: [] }))
      .data
  );

  useEffect(() => {
    setCartData(
      JSON.parse(
        localStorage.getItem("cartData") || JSON.stringify({ data: [] })
      ).data
    );
  }, [localStorage.getItem("cartData")]);

  useEffect(() => {
    console.log("cartData", cartData);
  }, [cartData]);

  const addToCart = (item: MenuItemViewEntity) => {
    const itemExists = cartData.some(
      (cartItem) => cartItem.item.name === item.name
    );

    let newCart = cartData;

    if (itemExists) {
      newCart = cartData.map((cartItem) => {
        if (cartItem.item.name === item.name) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }

        return cartItem;
      });
    } else {
      newCart = [...cartData, { item, quantity: 1 }];
    }

    localStorage.setItem(
      "cartData",
      JSON.stringify({ data: newCart, updatedAt: dayjs().toISOString() })
    );
    setCartData(newCart);
    recalculateCart();
  };

  const removeFromCart = (item: MenuItemViewEntity) => {
    const itemExists = cartData.some(
      (cartItem) => cartItem.item.name === item.name
    );

    if (!itemExists) return;

    let newCart = cartData;

    newCart = cartData.map((cartItem) => {
      if (cartItem.item.name === item.name) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      }

      return cartItem;
    });

    newCart = newCart.filter((cartItem) => cartItem.quantity > 0);

    localStorage.setItem(
      "cartData",
      JSON.stringify({ data: newCart, updatedAt: dayjs().toISOString() })
    );
    setCartData(newCart);
    recalculateCart();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 350,
        borderLeft: `2px solid ${COLORS.PRIMARY_COLOR}`,
        padding: 2,
        boxSizing: "border-box",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 700 }}>
        Cos de cumparaturi
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
          paddingRight: 1,
          overflow: "auto",
          boxSizing: "border-box",
          gap: 2,
        }}
      >
        {cartData.map((data) => (
          <CheckoutItem
            key={data.item.name}
            imageUrl={data.item.photoUrl ?? DEFAULT_IMAGE_URL}
            price={data.item.normalPrice}
            name={data.item.name}
            quantity={data.quantity}
            addToCart={() => addToCart(data.item)}
            removeFromCart={() => removeFromCart(data.item)}
            changeQuantity={(quantity: number) =>
              changeQuantity(data.item, quantity)
            }
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 0.3,
          flexDirection: "column",
          gap: 0.5,
          justifyContent: "flex-end",
          marginTop: "auto",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ color: COLORS.TEXT_COLOR }}>Subtotal </Typography>
          <Typography sx={{ color: COLORS.TEXT_COLOR }}>
            {cartData.reduce(
              (acc, item) => acc + item.item.normalPrice * item.quantity,
              0
            )}{" "}
            lei
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ color: "grey" }}>Ambalaje </Typography>
          <Typography sx={{ color: "grey" }}>100 lei </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography style={{ color: "grey" }}>
            Servicii operationale{" "}
          </Typography>
          <Typography style={{ color: "grey" }}>100 lei </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "2px", backgroundColor: "grey" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography style={{ color: COLORS.TEXT_COLOR }}>Total</Typography>
          <Typography style={{ color: COLORS.TEXT_COLOR }}>200 lei </Typography>
        </Box>
        <Button sx={{ marginTop: 2 }} variant="outlined">
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
