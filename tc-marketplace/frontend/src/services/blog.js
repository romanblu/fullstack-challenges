import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchTopPosts = async () => {
    const res = await axios.get(`${API}/api/blog/`);
    return res;
}

export const getFeaturedPosts = async () => {
    try{

        const res = await axios.get(`${API}/api/blog/featured`)
        return res
    } catch (err){
        console.log("Could not get featured posts", err)
    }
}

export const getPost = async ( slug ) => {
    try{
        const res = await axios.get(`${API}/api/blog/${slug}`)
        return res
    } catch(err){
        console.log("Could not fetch blog, error: ", err)
    }
}

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
    const res = await axios.post(`${API}/api/blog`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res;
}

export const updatePost = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/api/blog/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;
}
