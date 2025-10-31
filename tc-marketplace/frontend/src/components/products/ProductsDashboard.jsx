import { useEffect, useState } from "react";
import { getMyProducts } from "../../api/store";
import ProductCard from "./ProductCard";

const ProductsDashboard = ({ setActiveTab, setSelectedProduct }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getMyProducts().then((data) => {
            setProducts(data )
        });
    }, []);

    const handleAddProduct = () => {
        setActiveTab("newProduct");
    }


    return (
        <div>
             <div className="container max-w-[1100px] mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-green-800 mb-6">My Products</h1>
                    <button onClick={handleAddProduct} className="border bg-slate-200 border-gray-200 px-3 py-1 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">Add New Product</button>

                </div>
                {/* <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} /> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} setSelectedProduct={setSelectedProduct} setActiveTab={setActiveTab}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductsDashboard;