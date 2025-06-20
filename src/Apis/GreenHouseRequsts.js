// src/Apis/GreenHouseRequsts.js
import axiosClient from "./axiosCLient";

const Readings = {
  getRead: (limit) => {
    const url = "/readings/getReadings";
    return axiosClient.get(url, {
      params: { limit },
    });
  },
};

export default Readings;
