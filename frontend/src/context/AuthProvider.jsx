import React, { createContext, useContext, useLayoutEffect } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import {
  accessTokenAtom,
  isAuthenticatedAtom,
  useremailAtom,
  usernameAtom,
} from "../jotai";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_TOKEN_URL = `${import.meta.env.VITE_API_AUTH_URL}${import.meta.env.VITE_API_REFRESH_TOKEN_URL}`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [useremail, setUseremail] = useAtom(useremailAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        setAuthHeader(accessToken);
      } else {
        try {
          const refreshResponse = await api.get(REFRESH_TOKEN_URL);
          if (refreshResponse.data.accessToken) {
            const newToken = refreshResponse.data.accessToken;
            setAccessToken(newToken);
            setIsAuthenticated(true);
            setAuthHeader(newToken);
            setUsername(refreshResponse.data.username);
            setUseremail(refreshResponse.data.useremail);
          }
        } catch {
          setAccessToken(null);
        }
      }
    };
    checkAuth();
  }, []);

  api.interceptors.request.use(
    (config) => {
      const token = accessToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const login = async (email, password) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_AUTH_URL}/login`,
        {
          email,
          password,
        },
      );
      const token = response.data.token;
      setAccessToken(token);
      setIsAuthenticated(true);
      setUsername(response.data.username);
      setUseremail(response.data.useremail);
      return true;
    } catch (error) {
      throw new Error("Login failed ", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_API_AUTH_URL}/logout`);
      if (res) {
        setIsAuthenticated(false);
        setAccessToken("");
        setUsername("");
        setUseremail("");
        window.location.reload();
      }
    } catch (error) {
      console.log("Logout Error : ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAxios = () => {
  return api;
};
