import { LeftSideMenu } from "./components/LeftSideMenu";
import { useEffect, useState } from "react";
import { SCREENS } from "./utils/constants.tsx";
import HomeScreen from "./components/HomeScreen/HomeScreen.tsx";
import { loginRequest } from "./authConfig.tsx";
import axiosInstance from "./api/axiosConfig.tsx";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { Button } from "antd";

const App = () => {
  const [selectedScreen, setSelectedScreen] = useState(SCREENS.HOME);
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  const handleLogin = async () => {
    try {
      const result = await login(InteractionType.Redirect, loginRequest);
      if (result) {
        setToken(result.accessToken);
        localStorage.setItem("token", result.accessToken);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      handleLogin().then(() => {});
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      console.log("result 2", result);
      setToken(result.accessToken);
      localStorage.setItem("token", result.accessToken);
    }
  }, [result]);

  useEffect(() => {
    if (token) {
      console.log("token", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      handleLogin();
    }
  }, [token]);

  const renderRightSide = () => {
    switch (selectedScreen) {
      case SCREENS.HOME:
        return <HomeScreen />;
      case SCREENS.SETTINGS:
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
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            backgroundImage: "linear-gradient(#dfebfb, #cfd5f7)",
            padding: 40,
            display: "flex",
            boxSizing: "border-box",
            gap: 20,
          }}
        >
          <Button
            onClick={() => {
              axiosInstance.get("/menu");
            }}
          >
            Call smth
          </Button>
          <LeftSideMenu setScreen={setSelectedScreen} />
          <div
            style={{
              flex: 1,
              borderRadius: "25px",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            {renderRightSide()}
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        "You are not authenticated. Please sign in to continue."
      </UnauthenticatedTemplate>
    </>
  );
};

export default App;
