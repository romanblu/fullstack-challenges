import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../services/product";

export const useProduct = (slug) => {
  const query = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await getProductBySlug(slug);
      return res.data.product;
    },
    enabled: !!slug,
  });

  return query;
};