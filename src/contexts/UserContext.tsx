import { createContext, useEffect, useState } from "react";
import { UserEntity, UserEntityContext } from "../types/entities";
import { useMsal } from "@azure/msal-react";
import { getUserPermissions } from "../api/user";
import { InteractionStatus } from "@azure/msal-browser";

const UserContext = createContext<UserEntityContext>({
  user: undefined,
  setUser: () => {},
  permissions: [],
  isAdminMode: false,
  setIsAdminMode: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { accounts, inProgress } = useMsal();

  const [user, setUser] = useState<UserEntity | undefined>(undefined);
  const [permissions, setPermissions] = useState<string[]>([]);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  useEffect(() => {
    if (accounts.length > 0 && inProgress === InteractionStatus.None) {
      setUser({
        id: accounts[0].localAccountId,
        name: accounts[0].name ?? "",
        email: accounts[0].username,
      });
    }
  }, [accounts, inProgress]);

  const handleGetPermissions = async () => {
    const permissionResponse = await getUserPermissions();
    if (!permissionResponse) return;
    setPermissions(permissionResponse.permissions);

    if (permissionResponse.permissions.includes("ADMIN")) {
      setIsAdminMode(localStorage.getItem("isAdminMode") === "true");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User", user);

      handleGetPermissions();
    }
  }, [user]);

  useEffect(() => {
    console.log("Permissions", permissions);
  }, [permissions]);

  return (
    <UserContext.Provider
      value={{ user: user, setUser, permissions, isAdminMode, setIsAdminMode }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
