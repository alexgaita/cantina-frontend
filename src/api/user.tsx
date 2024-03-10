import axiosInstance from "./axiosConfig";
import { UserPermissionsResponse } from "../types/responses";
import { Address, UserEntityData } from "../types/entities";

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

export const deleteUserAddress = async (id: number) => {
  return axiosInstance.delete(`user/address/${id}`).then(responseData);
};

export const updateUserAddress = async (adress: Address) => {
  return axiosInstance.put(`user/address`, adress).then(responseData);
};

export const updateUser = async (user: any) => {
  return axiosInstance.put(`user`, user).then(responseData);
};
