import apiClient from "./apiClient";

const API = import.meta.env.VITE_API_URL;


export const addToCart = async ({
  productId,
  variantId = null,
  quantity = 1
}) => {
  const response = await apiClient.post(`${API}/api/cart/add`, {
    productId,
    variantId,
    quantity
  });

  return response.data.data;
};

export const getCart = async () => {
  const response = await apiClient.get(`${API}/api/cart`);
  return response.data.data;
};
