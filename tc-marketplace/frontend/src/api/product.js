import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getProductBySlug = async (slug) => {
    const res = await axios.get(`${API}/api/products/${slug}`)
    return res
}

export const getFeaturedProducts = async () => {
    const res = await axios.get(`${API}/api/products/featured`)
    return res
}

export const getProducts = async () => {
    const res = await axios.get(`${API}/api/products`)
    return res
}

export const createProduct = async (data) => {
    const token = localStorage.getItem("token");
    try{
        const res = await axios.post(`${API}/api/products`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return {
            ok : true,
            data: res.data
        };
    }catch(err){
        const message = err.response?.data?.message || "Something went wrong"
        return { 
            ok: false,
            status: err?.response?.status, 
            error: message 
        }
    }
}


export const updateProduct = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await axios.patch(`${API}/api/products/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

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

export const getMyProducts = async () => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"))    
   
    const res = await axios.get(`${API}/api/products/seller/${user.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });


    return res.data;
}