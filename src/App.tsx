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
import { Box } from "@mui/material";
import AccoutScreen from "./components/AccountScreen/AccountScreen.tsx";
import { UserContext } from "./contexts/UserContext.tsx";
import CartScreen from "./components/CartScreen/CartScreen.tsx";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const { selectedScreen, setSelectedScreen } = useContext(UserContext);

  const { login, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  const handleSetSelectedScreen = (screen: string) => {
    localStorage.setItem("selectedScreen", screen);
    setSelectedScreen(screen);
  };

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
      case SCREENS.CART:
        return <CartScreen />;
      case SCREENS.PROFILE:
        return <AccoutScreen />;
      case SCREENS.CARD:
        return <div>Card</div>;
      case SCREENS.ORDERS:
        return <div>Comenzi</div>;
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
          <LeftSideMenu setScreen={handleSetSelectedScreen} />
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
