import ProductCard from "./ProductCard";

const FeaturedProducts = ({ FeaturedProducts }) => {
    return (
      <section className=" bg-slate-200 px-10 text-green-950 pt-8">
          <div className="container max-w-[1100px] mx-auto">
              <h1 className="text-3xl font-bold text-center">Featured Products</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 pb-16 ">
              {FeaturedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}   
              </div>
          </div>
      </section>
    );
}

export default FeaturedProducts;