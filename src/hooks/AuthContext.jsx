/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => {
  const contxt = useContext(AuthContext);
  if (!contxt) throw new Error("useAuth must be used within its provider.");

  return contxt;
};

export const setToken = (token, account) => {
  const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
  localStorage.setItem("authToken", token);
  localStorage.setItem("account", JSON.stringify(account));
  localStorage.setItem("tokenExpiration", expirationTime);
};

export const getToken = () => {
  const token = localStorage.getItem("authToken");
  const account = localStorage.getItem("account");
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (!token || !expirationTime) {
    return null;
  }

  const currentTime = new Date().getTime();
  if (currentTime > expirationTime) {
    removeToken();
    return null;
  }
  return {
    token: localStorage.getItem("authToken"),
    account: localStorage.getItem("account"),
  };
};

export const removeToken = (nav = () => {}) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("account");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("sensor_readings");
  localStorage.removeItem("wornings");
  localStorage.removeItem("GPTHestory");
  nav("/");
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [account, setAccount] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const tokenData = getToken();
    if (tokenData) {
      const { token, account } = tokenData;
      console.log("token",token)
      setAuth(token);
      setAccount(JSON.parse(account));
    }
  }, []);

  const logout = async () => {
    removeToken();
    setAuth(null);
    setAccount(null);
    nav("/");
  };

  const updateUser = (updatedUser) => {
    setAccount(updatedUser);
    localStorage.setItem("account", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        auth: auth || null,
        setAuth,
        account: account || null,
        setAccount,
        setToken,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
