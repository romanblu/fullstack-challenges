import SelectedCategories from "../../components/ui/SelectedCategories"



export const ProductDetails = ({ product }) => {
    
    return (
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
    )
}