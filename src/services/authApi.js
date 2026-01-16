
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = `${BASE_URL}/api/auth`;

// SIGNUP
export const signupUser = async (userData) => {
    const res = await axios.post(`${API}/signup`, userData);
    return res.data;
};

// LOGIN
export const loginUser = async (userData) => {
    const res = await axios.post(`${API}/login`, userData);
    return res.data;
};
