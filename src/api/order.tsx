import axiosInstance from "./axiosConfig";
import {
  InitialOrderResponse,
  UserPermissionsResponse,
} from "../types/responses";
import { Address, OrderCreateEntity, UserEntityData } from "../types/entities";

const responseData = (response: any) => response.data;

export const placeOrder = async (
  order: OrderCreateEntity
): Promise<InitialOrderResponse> =>
  axiosInstance
    .post("order", order)
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });

export const confirmOrder = async (orderId: number): Promise<void> =>
  axiosInstance.post(`order/confirm/${orderId}`).then(responseData);
