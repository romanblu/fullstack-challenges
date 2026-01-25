import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function uploadSingleImage (file, options = {}) {
    const { productId, storeId, sessionId, order } = options;

    if (!file) throw new Error("uploadSingleImage: file is required");

    const formData = new FormData();
    formData.append("image", file);

    // used for organizing the files in S3 buckets
    if (storeId) formData.append("storeId", storeId);
    if (productId) formData.append("productId", productId);
    if (sessionId) formData.append("sessionId", sessionId);
    if (order) formData.append("order", order);

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

async function getPresignedUrl({ storeId, productId, sessionId, fileName, fileType }) {
    const response = await axios.get(`${API}/api/upload/presigned-url`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        params:{
            storeId,
            productId,
            sessionId,
            fileName,
            fileType
        }, 
    })
    const {uploadUrl,publicUrl, key} = response.data;
    console.log(uploadUrl,publicUrl, key);
    return { uploadUrl, publicUrl, key}
}

export async function uploadFile({ file, storeId, productId, sessionId }) {

    const { uploadUrl, publicUrl, key } = await getPresignedUrl({ storeId, productId, sessionId, fileName: file.name, fileType: file.type });

    const response = await axios.put(uploadUrl, file,{
        headers: {
            "Content-Type": file.type,  
        },
    })

    return { success: response.status === 200 , uploadUrl, publicUrl, key}    
}