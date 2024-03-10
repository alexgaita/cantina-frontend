import axiosInstance from "./axiosConfig";

const responseData = (response: any) => response.data;

export const getAllContainers = async (): Promise<string[]> =>
  axiosInstance
    .get("containers")
    .then(responseData)
    .catch((error) => {
      console.error(error);
    });
