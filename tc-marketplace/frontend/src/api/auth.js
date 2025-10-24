import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/api/auth/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/api/auth/login`, data);
  return res.data;
};