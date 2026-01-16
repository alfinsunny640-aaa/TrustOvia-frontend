import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = `${BASE_URL}/api/address`;

export const getAddresses = (userId) => {
    return axios.get(`${API}/${userId}`);
};

export const addAddress = (userId, data) => {
  
    return axios.post(`${API}/${userId}`, data);


};


export const updateAddress = (id, data) => {
    return axios.put(`${API}/${id}`, data);
};

export const deleteAddress = (id) => {
    return axios.delete(`${API}/${id}`);
};

export const setDefaultAddress = (id) => {
    return axios.put(`${API}/default/${id}`);
};
