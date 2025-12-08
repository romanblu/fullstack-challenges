import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function uploadSingleImage (file, options = {}) {
    const { productId, storeId } = options;

    if (!file) throw new Error("uploadSingleImage: file is required");

    const formData = new FormData();
    formData.append("image", file);

    // used for organizing the files in S3 buckets
    if (storeId) formData.append("storeId", storeId);
    if (productId) formData.append("productId", productId);

    const res = await axios.post(`${API}/api/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!res.data.success) {
        
        throw new Error(err.message || "Image upload failed");
    }

    

    return {
        key: res.data.key,
        url: res.data.url,
        success: res.data.success
    };

}