import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { COLORS, DEFAULT_IMAGE_URL } from "../../utils/constants";
import { CartItemEntity, MenuItemViewEntity } from "../../types/entities";
import { useEffect, useState } from "react";
import CheckoutItem from "../HomeScreen/CheckoutItem/CheckoutItem";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getContainersForMenuItem } from "../../api/containers";
import { MenuItemContainerResponse } from "../../types/responses";
import CheckoutModal from "../HomeScreen/EditModal/CheckoutModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OtCa009qVtJy5jRISxekwwFVwZ9f4JOe5qxr4zLafhbiXZLzHx3glNK54Hdq6PPQAHQRFp6GBh0ri4Vf2fybT2K00aatSKrWk"
);

const options = {
  // passing the client secret obtained from the server
  clientSecret: "pi_3OtDKC09qVtJy5jR0XvTzHF5_secret_KT8WM8f8ukXEwJamWXSgpvsOp",
};

const CartScreen = () => {
  const [cartData, setCartData] = useState<CartItemEntity[]>(
    JSON.parse(localStorage.getItem("cartData") || JSON.stringify({ data: [] }))
      .data
  );

  const [openModal, setOpenModal] = useState(false);
  const [useSilverware, setUseSilverware] = useState(true);
  const [comment, setComment] = useState("");
  const [containersByItem, setContainersByItem] =
    useState<MenuItemContainerResponse>();
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

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
  };

  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  const handleGetContainers = async () => {
    const response = await getContainersForMenuItem(
      cartData.map((item) => item.item.name)
    );
    console.log("response", response);
    setContainersByItem(response);
  };

  useEffect(() => {
    if (!cartData.length) return;
    handleGetContainers();
  }, [cartData]);

  const computeContainersPrice = () => {
    let price = 0;
    if (!containersByItem || !cartData.length) return price;

    cartData.forEach((cartItem: CartItemEntity) => {
      const containers = containersByItem.items[cartItem.item.name];

      if (!containers) return;

      containers.forEach((container) => {
        price += container.price * cartItem.quantity;
      });
    });

    return Number(price.toFixed(2));
  };

  const computeContainersList = () => {
    if (!containersByItem || !cartData.length) return "Nu exist ambalaje";

    return (
      <Box>
        {cartData.map((cartItem: CartItemEntity) => {
          const containers = containersByItem.items[cartItem.item.name];

          if (!containers.length) return;

          return (
            <Box>
              <Typography variant="subtitle1">
                {cartItem.item.name}{" "}
                {cartItem.quantity > 1 ? `x ${cartItem.quantity} buc` : ""}
              </Typography>
              <Box>
                {containers.map((container) => (
                  <Box>
                    <Typography variant="subtitle2">
                      {container.name} - {container.price} lei
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  const computeProductPrice = () => {
    let price = 0;
    cartData.forEach((cartItem) => {
      price += cartItem.item.normalPrice * cartItem.quantity;
    });
    return Number(price.toFixed(2));
  };

  const computeTotalPrice = () => {
    let price = computeProductPrice();

    if (price === 0) return price;

    price += computeContainersPrice();

    price += 10; // transport

    return Number(price.toFixed(2));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        // padding: 4,
        boxSizing: "border-box",
        height: "100%",
        // width: "100%",
        // overflow: "auto",
        // backgroundColor: "red",
        // maxWidth: 600,

        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 0.7,
          paddingTop: 3,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 1,
          boxSizing: "border-box",
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
        >
          Cos de cumparaturi
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflow: "auto",
            height: 450,
          }}
        >
          {cartData.map((data) => (
            <CheckoutItem
              imageUrl={data.item.photoUrl ?? DEFAULT_IMAGE_URL}
              price={data.item.normalPrice}
              discountedPrice={data.item.discountedPrice}
              quantity={data.quantity}
              name={data.item.name}
              addToCart={() => addToCart(data.item)}
              removeFromCart={() => removeFromCart(data.item)}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", flex: 1, gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#EDEDF0",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                padding: 1,
              }}
            >
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                options={[
                  { title: "Cartela 1" },
                  { title: "Cartela 2" },
                  { title: "Cartela 3" },
                  { title: "Cartela 4" },
                ]}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cartele"
                    sx={{ backgroundColor: "white" }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: "#EDEDF0",
                borderRadius: "10px",
                padding: 1,
                display: "flex",
                boxSizing: "border-box",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
              >
                Doresc tacamuri
              </Typography>
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                checked={useSilverware}
                onChange={(e) => setUseSilverware(e.target.checked)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              backgroundColor: "#EDEDF0",
              borderRadius: "10px",
              padding: 2,
              alignItems: "center",
            }}
          >
            <TextField
              label="Comentarii"
              variant="outlined"
              fullWidth
              multiline
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              rows={4}
              InputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 0.3,
          padding: 3,
          gap: 3,
          boxSizing: "border-box",
          borderLeft: `2px solid ${COLORS.PRIMARY_COLOR}`,
          //   backgroundColor: "blue",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: COLORS.PRIMARY_COLOR, fontWeight: 700 }}
        >
          Total
        </Typography>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            boxSizing: "border-box",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 1,
              borderBottom: `1px solid ${COLORS.PRIMARY_COLOR}`,
            }}
          >
            <Typography variant="subtitle1">Produse</Typography>
            <Typography variant="subtitle1">
              {computeProductPrice()} lei
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 1,
              borderBottom: `1px solid ${COLORS.PRIMARY_COLOR}`,
            }}
          >
            <Typography variant="subtitle1">
              Ambalaje
              <Tooltip title={computeContainersList()}>
                <InfoOutlinedIcon sx={{ fontSize: 15 }} />
              </Tooltip>
            </Typography>
            <Typography variant="subtitle1">
              {computeContainersPrice()} lei
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 1,
              borderBottom: `1px solid ${COLORS.PRIMARY_COLOR}`,
            }}
          >
            <Typography variant="subtitle1">
              Taxe operationale
              <Tooltip title="Taxe percepute pentru impachetare etc">
                <InfoOutlinedIcon sx={{ fontSize: 15 }} />
              </Tooltip>
            </Typography>
            <Typography variant="subtitle1">x lei</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 1,
              borderBottom: `1px solid ${COLORS.PRIMARY_COLOR}`,
            }}
          >
            <Typography variant="subtitle1">Transport</Typography>
            <Typography variant="subtitle1">10 lei</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: COLORS.PRIMARY_COLOR, fontWeight: 700 }}
            >
              Metoda de plata
            </Typography>
            <RadioGroup
              row={false}
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Card"
                labelPlacement="end"
              />
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Plata cash la livrare"
                labelPlacement="end"
              />
            </RadioGroup>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 1,
              // marginTop: "auto",
              borderTop: `2px solid black`,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.PRIMARY_COLOR, fontWeight: 700 }}
            >
              Total
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: COLORS.PRIMARY_COLOR, fontWeight: 700 }}
            >
              {computeTotalPrice()} lei
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={!cartData.length}
            onClick={() => setOpenModal(true)}
          >
            Trimite Comanda
          </Button>
        </Box>
      </Box>
      {openModal && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutModal
            cartData={cartData}
            totalPrice={computeTotalPrice()}
            open={openModal}
            handleClose={() => setOpenModal(false)}
            wantSilverware={useSilverware}
            payByCard={paymentMethod === "card"}
            comment={comment}
          />
        </Elements>
      )}
    </Box>
  );
};

export default CartScreen;
