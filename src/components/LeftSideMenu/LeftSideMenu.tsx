import MenuItem from "./NavigationMenuItem/index.tsx";
import { SCREENS } from "../../utils/constants.tsx";
import { Box, Typography } from "@mui/material";
import HomeIcon from "./icons/HomeIcon.tsx";
import MenuIcon from "./icons/MenuIcon.tsx";
import ProfileIcon from "./icons/ProfileIcon.tsx";
import PortofelIcon from "./icons/PortofelIcon.tsx";

interface ILeftSideMenu {
  setScreen: (screen: string) => void;
}

const LeftSideMenu = ({ setScreen }: ILeftSideMenu) => {
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

      <MenuItem
        title={"Acasa"}
        icon={HomeIcon}
        setScreen={() => setScreen(SCREENS.HOME)}
      />
      <MenuItem
        title={"Meniu"}
        icon={MenuIcon}
        setScreen={() => setScreen(SCREENS.MENU)}
      />
      <MenuItem
        title={"Cartele"}
        icon={PortofelIcon}
        setScreen={() => setScreen(SCREENS.CARD)}
      />

      <MenuItem
        title={"Profil"}
        icon={ProfileIcon}
        setScreen={() => setScreen(SCREENS.PROFILE)}
      />
    </Box>
  );
};

export default LeftSideMenu;
