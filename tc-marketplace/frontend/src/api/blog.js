import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchMyPosts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/api/blog/my-posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res
}

export const createPost = async (data) => {
    const token = localStorage.getItem("token");
    console.log("Creating blog post with data:", data);
    const res = await axios.post(`${API}/api/blog`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res;
}