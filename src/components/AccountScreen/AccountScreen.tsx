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
import { Address, UserEntity, UserEntityData } from "../../types/entities";
import { getUserData, updateUser } from "../../api/user";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddressCard from "./AdressCard/AdressCard";

const initialAddress: Address = {
  id: 0,
  value: "",
  isCurrent: false,
};

const AccoutScreen = () => {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState<UserEntityData>();
  const [refethData, setRefetchData] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetUserData = async () => {
    setLoading(true);
    if (!user) return;
    const response = await getUserData();
    setUserData(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserData();
  }, [user]);

  useEffect(() => {
    if (!refethData) return;
    handleGetUserData();
    setRefetchData(false);
  }, [refethData]);

  const handleSaveUserData = async () => {
    setLoading(true);
    try {
      await updateUser(userData);
    } catch (e) {
      setRefetchData(true);
    }
    setLoading(false);
  };

  if (!user || !userData) return null;

  const deleteUnsavedAddress = () => {
    setUserData({
      ...userData,
      addresses: userData.addresses.filter((address) => address.id !== 0),
    });
  };

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
          <Button variant="contained" onClick={handleSaveUserData}>
            Salveaza
          </Button>
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
          onChange={(e) =>
            setUserData({ ...userData, phoneNumber: e.target.value })
          }
          error={
            /[^0-9]/.test(userData.phoneNumber) ||
            userData.phoneNumber.length < 10
          }
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: 600,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: COLORS.TEXT_COLOR, fontWeight: 700 }}
        >
          Adresele mele
        </Typography>{" "}
        <Button
          variant="contained"
          disabled={userData.addresses.some((address) => address.id === 0)}
          onClick={() =>
            setUserData({
              ...userData,
              addresses: [
                ...userData.addresses,
                {
                  ...initialAddress,
                  isCurrent: userData.addresses.length ? false : true,
                },
              ],
            })
          }
        >
          Adauga adresa
        </Button>
      </Box>

      {!loading && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {userData.addresses.map((address) => (
            <AddressCard
              key={address.id}
              initialAddress={address}
              deleteUnsavedAddress={deleteUnsavedAddress}
              handleRefetchData={() => setRefetchData(true)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AccoutScreen;
