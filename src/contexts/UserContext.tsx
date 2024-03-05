import { createContext, useEffect, useState } from "react";
import { UserEntity, UserEntityContext } from "../types/entities";
import { useMsal } from "@azure/msal-react";
import { getUserPermissions } from "../api/user";
import { InteractionStatus } from "@azure/msal-browser";

const UserContext = createContext<UserEntityContext>({
  user: undefined,
  setUser: () => {},
  permissions: [],
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { accounts, inProgress } = useMsal();

  const [user, setUser] = useState<UserEntity | undefined>(undefined);
  const [permissions, setPermissions] = useState<string[]>([]);

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
    const permissions = await getUserPermissions();
    console.log("Permissions", permissions);
    setPermissions(permissions.permissions);
  };

  useEffect(() => {
    if (user) {
      console.log("User", user);

      handleGetPermissions();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user: user, setUser, permissions }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
