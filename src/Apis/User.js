/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const UserApi = {
  UpdateProfile: (data, auth) => {
    const url = "/user/edit";
    return axiosClient.post(url, data, {
      headers: { token: auth },
    });
  },
  GetAccountData: (auth) => {
    const url = "/user/getAccountData";
    return axiosClient.get(url, {
      headers: { token: auth },
    });
  },
};

export default UserApi;
