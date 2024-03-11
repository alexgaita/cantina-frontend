import { MenuItemContainerResponse } from "../types/responses";
import axiosInstance from "./axiosConfig";

const responseData = (response: any) => response.data;

export const getAllContainers = async (): Promise<string[]> =>
  axiosInstance
    .get("containers")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const getContainersForMenuItem = async (
  productsIds: string[]
): Promise<MenuItemContainerResponse> =>
  axiosInstance
    .post(`containers/items`, productsIds)
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });
