import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCategoryTree = async () => {
    const res = await axios.get(`${API}/api/categories/tree`);
    return res;
}
