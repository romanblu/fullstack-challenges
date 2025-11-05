import { useQuery } from '@tanstack/react-query';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../api/product";
import CategorySelector from "../components/ui/CategorySelector";
import { getCategoryTree } from '../api/category';
import SelectedCategories from '../components/ui/SelectedCategories';

const ProductPage = () => { 
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  
 const { data: categoryTree, isLoadingCategoryTree, categoryError } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
    getCategoryTree().then((res) =>  res.data),
  });

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug).then((res) => res.data),
    enabled: !!slug,  // only fetch after slug exists
  }); 

  useEffect( () =>{
    if(productData){
      setProduct(productData)
    }
  }, [productData])

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  if(isLoadingCategoryTree) return <p>Loading category tree...</p>

  if(categoryError) console.log("Category error", categoryError)

  return (
    <>
      <Navbar theme="light" />
      <section className="bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          {/* TODO : rotating image gallery */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={product?.mainImage}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {product?.name}
              </h1>
              {/* Categories */}

              {
                // <CategorySelector 
                //   categoryTree={categoryTree}
                //   selectedIds={product.categories}
                //   onChange={{}}
                //   />
                <SelectedCategories selectedIds={product.categories} />
              }

              <p className="text-green-700 text-sm uppercase mb-3">
                {product?.category}
              </p>
              <p className="text-gray-600 mb-6">{product?.description}</p>
              <p className="text-2xl font-bold text-green-800 mb-4">
                ${product?.price}
              </p>
              <p
                className={`mb-4 ${
                  product?.stock === "Available"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product?.stock}
              </p>
              <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      
      <Footer />
    </>
  );
};

export default ProductPage;