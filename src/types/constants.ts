export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const API_URLS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  GET_LEADS: `${API_BASE_URL}/api/leads`,
  CREATE_LEAD: `${API_BASE_URL}/api/leads`,
  DELETE_LEADS: `${API_BASE_URL}/api/leads`,
};
