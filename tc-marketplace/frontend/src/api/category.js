import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
    const res = await axios.get(`${API}/api/categories/`);
    return res;
}
