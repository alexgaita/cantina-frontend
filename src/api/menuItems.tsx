import axiosInstance from "./axiosConfig";
import { MenuItemsResponse } from "../types/responses";

const responseData = (response: any) => response.data;

export const getMenuItems = async (): Promise<MenuItemsResponse> =>
  axiosInstance
    .get("menu")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });
