import axiosInstance from "./axiosConfig";
import { UserPermissionsResponse } from "../types/responses";

const responseData = (response: any) => response.data;

export const getUserPermissions = async (): Promise<UserPermissionsResponse> =>
  axiosInstance
    .get("user/permissions")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });
