import MenuItem from "./NavigationMenuItem/index.tsx";
import { SCREENS } from "../../utils/constants.tsx";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import HomeIcon from "./icons/HomeIcon.tsx";
import MenuIcon from "./icons/MenuIcon.tsx";
import ProfileIcon from "./icons/ProfileIcon.tsx";
import PortofelIcon from "./icons/PortofelIcon.tsx";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.tsx";
import CartIcon from "./icons/CartIcon.tsx";

interface ILeftSideMenu {
  setScreen: (screen: string) => void;
}

const LeftSideMenu = ({ setScreen }: ILeftSideMenu) => {
  const { permissions, isAdminMode, setIsAdminMode } = useContext(UserContext);

  console.log("permissions", permissions);

  return (
    <Box
      sx={{
        width: "15%",
        display: "flex",
        bgcolor: "primary.main",
        paddingTop: 4,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0px 8px 8px 0px",
        gap: 1,
      }}
    >
      <Typography variant="h4" color="white" fontWeight={700} paddingBottom={2}>
        Cantina UPT
      </Typography>

      {permissions.some((item) => item === "ADMIN") && (
        <Box
          sx={{
            width: 200,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={isAdminMode}
                onChange={(e) => {
                  setIsAdminMode(e.target.checked);
                  localStorage.setItem(
                    "isAdminMode",
                    e.target.checked.toString()
                  );
                }}
              />
            }
            label={<Typography variant="subtitle1">Admin Mode</Typography>}
          />
        </Box>
      )}

      <MenuItem
        title={"Acasa"}
        icon={HomeIcon}
        setScreen={() => setScreen(SCREENS.HOME)}
      />

      <MenuItem
        title={"Comenzi"}
        icon={MenuIcon}
        setScreen={() => setScreen(SCREENS.ORDERS)}
      />

      <MenuItem
        title={"Profil"}
        icon={ProfileIcon}
        setScreen={() => setScreen(SCREENS.PROFILE)}
      />
      {!isAdminMode && (
        <>
          <MenuItem
            title={"Cos"}
            icon={CartIcon}
            setScreen={() => setScreen(SCREENS.CART)}
          />
          <MenuItem
            title={"Cartele"}
            icon={PortofelIcon}
            setScreen={() => setScreen(SCREENS.CARD)}
          />
        </>
      )}
    </Box>
  );
};

export default LeftSideMenu;
