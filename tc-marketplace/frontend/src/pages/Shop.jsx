import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

const Shop = () => {
    const [products, setProducts] = useState([])
    const [search,setSearch] = useState("")
    const [sort, setSort] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(`${apiUrl}/api/products`)
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    },[])


    const filtered = products
        .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
        if (sort === "low-high") return a.price - b.price;
        if (sort === "high-low") return b.price - a.price;
        return 0;
    });

  return (
    <div className="bg-slate-50 min-h-screen ">
        <Navbar theme="light" />
            <div className="container max-w-[1100px] mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-green-800 mb-6">All Products</h1>

                <FilterBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filtered.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

    </div>
  );
}

export default Shop;