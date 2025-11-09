import { useQuery } from '@tanstack/react-query';
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../api/product";
import SelectedCategories from '../components/ui/SelectedCategories';

const ProductPage = () => { 
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  
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
      setProduct(productData.product)
    }
  }, [productData])

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  console.log(product.store)
  return (
    <>
       <Navbar theme="light" />

    <section className="bg-slate-50 py-12">
      {/* TODO: key features section */}
      {/* TODO: stock indicator */}
      {/* TODO: variants selection  */}
      {/* TODO: specifications table */}
      {/* TODO: customer reviews with images */}
      {/* TODO: related products - top products from same category or close */}
      {/* TODO: FAQ table */}
      {/* TODO: Guarantee,certification, labels */}
      {/* TODO: Add breadcrumb navigation  */}
      {/* TODO: Trust badges under add to card */}
      {/* TODO: Estimated shipping time */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT COLUMN — IMAGES */}
        {/* TODOL Add support for multiple images */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={product?.mainImage}
              alt={product?.name}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {product?.name}
            </h1>

            {/* Categories */}
            {/* TODO: make the categories clickable then route to the category section */}
            <div className="mb-4">
              <SelectedCategories selectedIds={product.categories} />
            </div>

            {/* Species */}
            {product?.species && (
              <p className="text-gray-700 font-medium mb-1">
                Species: <span className="font-normal">{product.species}</span>
              </p>
            )}

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mt-4 mb-6">
              {product?.description}
            </p>

            {/* Price */}
            <p className="text-2xl font-extrabold text-green-800 mb-4">
              ${product?.price}
            </p>

            {/* Stock */}
            <p
              className={`mb-6 text-lg font-medium ${
                product?.stock === "Available"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product?.stock}
            </p>
              {/* TODO: add buy now button */}
            {/* Add to Cart Button */}
            <button className="bg-green-700 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
        {/* TODO: Shipping and return policy */}
        {/* RIGHT SIDEBAR — STORE INFORMATION */}
        <div className="space-y-6">
              {/* TODO: add seller logo, verified badge, possibly visit store, social icons, rating */}
          {product?.store && (
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Store Information
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Company Name:</span> {product.store.name}
                </p>

                <p>
                  <span className="font-medium">Email:</span> {product.store.contactEmail}
                </p>

                <p>
                  <span className="font-medium">Phone:</span> {product.store.contactPhone}
                </p>

                <p>
                  <span className="font-medium">Location:</span> {product.store.location}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>

    </>
  );
};

export default ProductPage;