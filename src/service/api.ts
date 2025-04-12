import axios from "axios";
import { API_BASE_URL } from "../types/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getToken = () => localStorage.getItem("jwtToken");

const setToken = (token: string) => localStorage.setItem("jwtToken", token);

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/api/auth/login", {
      email,
      password,
    });
    const data = response.data;
    if (data.status) {
      setToken(data.data);
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while logging in" };
  }
};
