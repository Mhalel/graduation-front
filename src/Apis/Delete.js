/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const Delete = {
  DeleteReadings: () => {
    const url = "/readings/DeleteReadings";
    return axiosClient.delete(url);
  },
  DeleteAlerts: () => {
    const url = "/readings/DeleteAlerts";
    return axiosClient.delete(url);
  },
  DeleteAccount: (auth) => {
    const url = "/user/deleteAccount";
    return axiosClient.delete(url, {
      headers: {
        token: auth || localStorage.getItem("authToken"),
      },
    });
  },
};

export default Delete;
