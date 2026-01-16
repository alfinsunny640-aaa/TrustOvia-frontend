import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = `${BASE_URL}/api/cart`;

export const getCart = (userId) =>
  axios.get(`${API}/${userId}`);

export const addToCart = (data) =>
  axios.post(`${API}/add`, data);

export const updateQuantity = (data) =>
  axios.put(`${API}/update`, data);

export const removeItem = (userId, productId) =>
  axios.delete(`${API}/remove/${userId}/${productId}`);
