import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig.tsx";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
