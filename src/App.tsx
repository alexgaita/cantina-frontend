import { LeftSideMenu } from "./components/LeftSideMenu";
import { useContext, useEffect, useState } from "react";
import { SCREENS } from "./utils/constants.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";
import { loginRequest } from "./authConfig.tsx";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { Box, Button } from "@mui/material";
import axiosInstance from "./api/axiosConfig.tsx";

const App = () => {
  const [selectedScreen, setSelectedScreen] = useState(SCREENS.HOME);

  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  const handleLogin = async () => {
    try {
      await login(InteractionType.Redirect, loginRequest);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      handleLogin();
    }
  }, [error]);

  const renderRightSide = () => {
    switch (selectedScreen) {
      case SCREENS.HOME:
        return <HomeScreen />;
      case SCREENS.PROFILE:
        return <div>Settings</div>;
      case SCREENS.CARD:
        return <div>Card</div>;
      case SCREENS.MENU:
        return <div>Menu</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <AuthenticatedTemplate>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            backgroundColor: "white",
            display: "flex",
            boxSizing: "border-box",
          }}
        >
          <LeftSideMenu setScreen={setSelectedScreen} />
          <div
            style={{
              flex: 1,
              borderRadius: "25px",
              backgroundColor: "white",
              padding: 10,
              boxSizing: "border-box",
            }}
          >
            {renderRightSide()}
          </div>
        </Box>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        "You are not authenticated. Please sign in to continue."
      </UnauthenticatedTemplate>
    </>
  );
};

export default App;
