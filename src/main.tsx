import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig.tsx";
import { MsalProvider } from "@azure/msal-react";
import { Button, IconButton, ThemeProvider, createTheme } from "@mui/material";
import { UserProvider } from "./contexts/UserContext.tsx";
import UserInterceptorProvider from "./api/AxiosProvider.tsx";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Typography } from "antd";
import CloseIcon from "@mui/icons-material/Close";

const msalInstance = new PublicClientApplication(msalConfig);

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E3192",
    },
    secondary: {
      main: "#000000",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MsalProvider instance={msalInstance}>
        <SnackbarProvider
          autoHideDuration={2000}
          maxSnack={3}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          action={(snackbarId) => (
            <IconButton onClick={() => closeSnackbar(snackbarId)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        >
          <UserInterceptorProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </UserInterceptorProvider>
        </SnackbarProvider>
      </MsalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
