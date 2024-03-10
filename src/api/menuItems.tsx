import axiosInstance from "./axiosConfig";
import { MenuItemResponse, MenuItemsResponse } from "../types/responses";
import { MenuItemEntity } from "../types/entities";

const responseData = (response: any) => response.data;

export const getMenuItems = async (): Promise<MenuItemsResponse> =>
  axiosInstance
    .get("menu")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const getMenuItemById = async (id: string): Promise<MenuItemResponse> =>
  axiosInstance
    .get(`menu/${id}`)
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const createOrUpdateMenuItem = async (data: MenuItemEntity) =>
  axiosInstance
    .put(`menu`, data)
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const deleteMenuItem = async (id: string) =>
  axiosInstance
    .delete(`menu/${id}`)
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const uploadItemPhoto = async (itemId: string, file: any) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance
    .post(`/uploadImage/${itemId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });
};

export const uploadMenu = async (file: any): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/upload", formData).then(responseData);
};
