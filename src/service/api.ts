import axios from "axios";
import { API_BASE_URL } from "../types/constants";
import { Lead } from "../types/interfaces";

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

export const createLead = async (leadData: Lead) => {
  try {
    const response = await apiClient.post("/api/leads", leadData);

    const data = response.data;
    if (data.status) {
      return { success: true, message: data.message, lead: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the lead",
    };
  }
};

export const getLeads = async () => {
  try {
    const token = getToken();
    if (!token) {
      return;
    }

    const response = await apiClient.get("/api/leads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    if (data.status) {
      return { success: true, message: data.message, leads: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching leads",
    };
  }
};

// API call to delete leads
export const deleteLeads = async (leadIds: string[]) => {
  try {
    const token = getToken();
    if (!token) {
      return;
    }

    const response = await apiClient.delete("/api/leads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: leadIds,
    });

    const data = response.data;
    if (data.status) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting leads",
    };
  }
};
