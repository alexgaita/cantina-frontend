import { createContext, useContext } from "react";
import { notification } from "antd";

interface ISnackbarContext {
    successNotification: (message: string, description: string) => void;
    failedNotification: (message: string, description: string) => void;
}

const defaultValue = {
    successNotification: (message: string, description: string) => {},
    failedNotification: (message: string, description: string) => {},


};

export const SnackbarContext = createContext<ISnackbarContext>(defaultValue);

interface ISnackBarProvider {
  children: any;
}

export const SnackBarProvider = ({ children }: ISnackBarProvider) => {
  const [api, contextHolder] = notification.useNotification({
    placement: "top",
    maxCount: 3,
  });

  const successNotification = (message: string, description: string) => {
    api.success({
      message,
      description,
      duration: 3,
    });
  };

  const failedNotification = (message: string, description: string) => {
    api.error({
      message,
      description,
      duration: 3,
    });
  };

  return (
    <SnackbarContext.Provider value={{ successNotification,failedNotification }}>
      <>{contextHolder}</>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};
