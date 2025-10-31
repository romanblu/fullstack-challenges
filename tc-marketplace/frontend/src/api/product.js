import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getFeaturedProducts = async () => {
    const res = await axios.get(`${API}/api/products/featured`)
    return res
}


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

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};