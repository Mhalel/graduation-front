/* eslint-disable prettier/prettier */

import axiosContral from "./axiosContral";

const ContralsApi = {
  Led1: (data) => {
    const url = "/Led1";
    return axiosContral.post(url, data);
  },
 
};

export default ContralsApi;
