import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig.tsx";
import { MsalProvider } from "@azure/msal-react";
import { ThemeProvider, createTheme } from "@mui/material";
import { UserProvider } from "./contexts/UserContext.tsx";
import UserInterceptorProvider from "./api/AxiosProvider.tsx";

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
        <UserInterceptorProvider />
        <UserProvider>
          <App />
        </UserProvider>
      </MsalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
