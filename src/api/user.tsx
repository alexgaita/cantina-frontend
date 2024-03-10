import axiosInstance from "./axiosConfig";
import { UserPermissionsResponse } from "../types/responses";
import { UserEntityData } from "../types/entities";

const responseData = (response: any) => response.data;

export const getUserPermissions = async (): Promise<UserPermissionsResponse> =>
  axiosInstance
    .get("user/permissions")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const getUserData = async (): Promise<UserEntityData> => {
  return axiosInstance.get("user").then(responseData);
};
