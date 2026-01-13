
import axios from "axios";

const AUTH_URL = "http://localhost:5000/api/auth";

// SIGNUP
export const signupUser = async (userData) => {
    const res = await axios.post(`${AUTH_URL}/signup`, userData);
    return res.data;
};

// LOGIN
export const loginUser = async (userData) => {
    const res = await axios.post(`${AUTH_URL}/login`, userData);
    return res.data;
};
