import api, { API_ROUTES } from "./api";

export interface CheckinResponse {
  lastCheckInTime: string;
  monthlyBitmap: number;
  message?: string;
}

export const userService = {
  checkIn: async (): Promise<CheckinResponse> => {
    const response = await api.put(API_ROUTES.USER.CHECK_IN, );

    console.log("Checkin API Response:", response.data.data);
    return response.data.data;
  },

  getRecord: async() => {
    const response = await api.get(API_ROUTES.USER.GET_RECORD);
    console.log("GetRecord API Response", response.data);
    return response.data;
  }
};