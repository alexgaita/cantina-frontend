import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import {
  Address,
  CartItemEntity,
  MenuItemEntity,
  UserEntityData,
} from "../../../types/entities";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { getUserData } from "../../../api/user";
import { COLORS } from "../../../utils/constants";
import {
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface ICheckoutModal {
  totalPrice: number;
  open: boolean;
  handleClose: () => void;
  wantSilverware: boolean;
  payByCard: boolean;
  cartData: CartItemEntity[];
  comment: string;
}

const CheckoutModal = ({
  open,
  handleClose,
  totalPrice,
  wantSilverware,
  payByCard,
  cartData,
  comment,
}: ICheckoutModal) => {
  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  console.log("coment", comment);

  const [userData, setUserData] = useState<UserEntityData>();
  const [address, setAddress] = useState<Address>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleGetUserData = async () => {
    if (!user) return;
    const response = await getUserData();
    setUserData(response);
    const currentAddress = response.addresses.find((a) => a.isCurrent);
    setAddress(currentAddress);
    setPhoneNumber(response.phoneNumber);
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    console.log("payment", result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      alert("Payment completed");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        width={"40%"}
        height={"80%"}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: COLORS.PRIMARY_COLOR, fontWeight: 700 }}
          >
            Checkout
          </Typography>
          <Typography variant="h6">Total: {totalPrice} RON</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Typography variant="h6">Adresa livrare</Typography>
            <Autocomplete
              fullWidth
              id="tags-outlined"
              options={userData?.addresses ?? []}
              value={address ?? null}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Typography variant="h6">Numar de telefon</Typography>
            <TextField
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Box>
        {comment && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6">Comentarii</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              disabled
              value={comment}
              rows={3}
            />
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Vreau tacamuri</Typography>
          {wantSilverware ? (
            <CheckIcon fontSize="large" style={{ color: "green" }} />
          ) : (
            <CloseIcon fontSize="large" style={{ color: "red" }} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingBottom: 2,
            borderBottom: `2px solid ${COLORS.PRIMARY_COLOR}`,
          }}
        >
          <Typography variant="h6">Produse</Typography>
          {cartData.map((item) => (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography key={item.item.name} variant="body1">
                {item.item.name}
              </Typography>
              <Typography key={item.item.name} variant="body1">
                x{item.quantity}
              </Typography>
            </Box>
          ))}
        </Box>
        {payByCard && <PaymentElement />}

        <Button variant="contained" onClick={handleSubmit} color="primary">
          Checkout
        </Button>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
