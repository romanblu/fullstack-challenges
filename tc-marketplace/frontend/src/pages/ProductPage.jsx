
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
  const product = {
    id: 1,
    name: "Philodendron Gloriosum",
    description:
      "A premium tissue culture plant known for its velvety leaves and striking white veins. Ideal for home growers and collectors.",
    price: 19.99,
    stock: "Available",
    image:
      "https://images.unsplash.com/photo-1611527664689-d430dd2a6774?auto=format&fit=crop&w=800&q=80",
    category: "House Plant",
  };

  return (
    <>
      <Navbar theme="light" />
      <section className="bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-green-700 text-sm uppercase mb-3">
                {product.category}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-2xl font-bold text-green-800 mb-4">
                ${product.price}
              </p>
              <p
                className={`mb-4 ${
                  product.stock === "Available"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.stock}
              </p>
              <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-6xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/400x400/?plant,${i}`}
                alt="Related Plant"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Related Plant {i + 1}
                </h3>
                <p className="text-green-700 font-semibold">$14.99</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductPage;