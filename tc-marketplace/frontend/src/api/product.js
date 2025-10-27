import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createProduct = async (data) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/api/products`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res;
}


export const updateProduct = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${API}/api/products/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("Update Product Response:", res);
    return res;
}