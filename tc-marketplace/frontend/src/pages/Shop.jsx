import { useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Navbar from "../components/layout/Navbar";
import ProductCard from "../features/products/ProductCard";
import FilterBar from "../components/ui/FilterBar";
import { getCategoryTree } from "../services/category"
import { getProducts } from "../services/product";
import Loader from "../components/ui/Loader";
import { filterAndSortProducts } from "../utils/productUtils";

const Shop = () => {
    const [filters, setFilters] = useState({
        search: "",
        sort: "",
        categories: [],
    });

    const { data: categories, isLoadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
        getCategoryTree().then((res) =>  res.data),
    });

    const {data: products, isLoadingProducts} = useQuery({
        queryKey: ["products"],
        queryFn: async () =>
        (await getProducts()).data.products
    })

    // memoize to avoid recalculation on every render
    const filteredProducts = useMemo(() => {
        if(!products) return []
        return filterAndSortProducts(products, filters)
    })

    if(isLoadingProducts || isLoadingCategories) {
        return <Loader />
    }
    
    return (
    <div className="bg-slate-50 min-h-screen ">
        <Navbar theme="light" />
            <div className="container max-w-[1100px] mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-green-800 mb-6">All Products</h1>

                <FilterBar 
                        categories={categories}  
                        filters={filters}
                        setFilters={setFilters}
                        />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
    </div>
  );
}

export default Shop;