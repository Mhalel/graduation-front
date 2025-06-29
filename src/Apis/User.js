/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const UserApi = {
  UpdateProfile: (data, auth) => {
    const url = "/user/edit";
    return axiosClient.post(url, data, {
      headers: { token: auth || localStorage.getItem("authToken") },
    });
  },
  GetAccountData: (auth) => {
    const url = "/user/getAccountData";
    return axiosClient.get(url, {
      headers: { token: auth || localStorage.getItem("authToken") },
    });
  },
};

export default UserApi;
