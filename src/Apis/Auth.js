/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const AuthApi = {
  signIn: (data) => {
    const url = "/auth/signIn";
    return axiosClient.post(url, data);
  },
  signup: (data) => {
    const url = "/auth/signUp";
    return axiosClient.post(url, data);
  },
  edit: (data, auth) => {
    const url = "/user/edit";
    return axiosClient.post(url, data, { headers: { auth } });
  },
};

export default AuthApi;
