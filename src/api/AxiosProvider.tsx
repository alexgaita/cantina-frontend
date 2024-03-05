import { useMsal } from "@azure/msal-react";
import axiosInstance from "./axiosConfig";
import { loginRequest } from "../authConfig";
import { useEffect } from "react";

interface UserInterceptorProviderProps {
  children: React.ReactNode;
}

const UserInterceptorProvider = ({
  children,
}: UserInterceptorProviderProps) => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];

  useEffect(() => {
    if (!account) return;
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const account = accounts[0];

        if (account) {
          // Acquire a token silently
          const silentRequest = {
            account: account,
            scopes: loginRequest.scopes,
          };

          try {
            const response = await instance.acquireTokenSilent(silentRequest);
            // Attach the token to the request headers
            config.headers.Authorization = `Bearer ${response.accessToken}`;
          } catch (error) {
            console.error("Error acquiring token silently:", error);
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [account, instance]);

  return children;
};

export default UserInterceptorProvider;
