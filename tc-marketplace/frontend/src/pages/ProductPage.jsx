import Navbar from "../components/layout/Navbar";
import { useParams } from "react-router-dom";
import { useProduct } from '../hooks/useProduct';
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { ProductDetails } from '../features/products/ProductDetails';
import { SellerDetails } from '../features/products/SellerDetails';

const ProductPage = () => { 
  const { slug } = useParams()
  const { data: product, isLoading, error } = useProduct(slug);    

  if(isLoading) return <Loader />
  if(error) return <ErrorMessage message="Failed to get product data"/>

  return (
    <>
      <Navbar theme="light" />

    <section className="bg-slate-50 py-12">
      {/* TODO: key features section */}
      {/* TODO: stock indicator */}
      {/* TODO: variants selection  */}
      {/* TODO: if variants - add price diffrenece between the least and most expensive */}
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
        <ProductDetails product={product}/>
        {/* TODO: Shipping and return policy */}
        {/* RIGHT SIDEBAR — STORE INFORMATION */}
        <div className="space-y-6">
              {/* TODO: add seller logo, verified badge, possibly visit store, social icons, rating */}
          {product?.store && (
            <SellerDetails store={product.store} />
          )}

        </div>

      </div>
    </section>

    </>
  );
};

export default ProductPage;