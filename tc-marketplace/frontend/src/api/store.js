import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getMyStore = async (data) => { 
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/api/store`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export const updateStoreInfo = async (data) => { 
    const token = localStorage.getItem("token");

    const res = await axios.put(`${API}/api/store`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data
}

export const getMyProducts = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/api/store/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}