import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { COLORS } from "../../utils/constants";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { UserEntity, UserEntityData } from "../../types/entities";
import { getUserData } from "../../api/user";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddressCard from "./AdressCard/AdressCard";

const AccoutScreen = () => {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState<UserEntityData>();

  const handleGetUserData = async () => {
    if (!user) return;
    const response = await getUserData();
    setUserData(response);
  };

  useEffect(() => {
    handleGetUserData();
  }, [user]);

  if (!user || !userData) return null;

  console.log("userData", userData);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: 4,
        boxSizing: "border-box",
        height: "100%",
        width: "100%",
        overflow: "auto",
        // backgroundColor: "red",
        // maxWidth: 600,

        gap: 2,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", maxWidth: 600, gap: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
          >
            Profil
          </Typography>
          <Button variant="contained">Salveaza</Button>
        </Box>

        <Box display={"flex"} gap={3}>
          <TextField
            sx={{ flex: 0.5, maxWidth: 300 }}
            label="Pret angajat UPT"
            value={user.name}
            disabled
            variant="outlined"
          />
          <TextField
            sx={{ flex: 0.5, maxWidth: 300 }}
            label="Pret angajat UPT"
            value={user.email}
            disabled
            variant="outlined"
          />
        </Box>

        <TextField
          sx={{ maxWidth: 600 }}
          label="Numar de telefon"
          value={userData.phoneNumber}
          variant="outlined"
        />
      </Box>
      <Typography
        variant="h4"
        style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
      >
        Adresele mele
      </Typography>{" "}
      <Box
        sx={{
          display: "flex",
          height: "100%",
          //   backgroundColor: "red",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {userData.addresses
          .sort((address) => (address.isCurrent ? -1 : 1))
          .map((address) => (
            <AddressCard key={address.id} initialAddress={address} />
          ))}
      </Box>
    </Box>
  );
};

export default AccoutScreen;
