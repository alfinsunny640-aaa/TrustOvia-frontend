import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = `${BASE_URL}/api/products`;

export const getProducts = async () => {
    const response = await axios.get(API);
    return response.data;
};
