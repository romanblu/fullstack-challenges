import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product, setSelectedProduct, setActiveTab }) {
    const { user } = useContext(AuthContext);

    const isSeller = user && product.seller._id === user.id; // check if this product belongs to logged user

    const handleEditProduct = () => {
        setSelectedProduct(product);
        setActiveTab("editProduct");
    }

    return (
        <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition flex flex-col h-full justify-between">
            <Link to={`/product/${product.slug}`}>
                <img
                    src={product.mainImage}
                    alt={product.name}
                    className="rounded-sm w-full h-56 object-cover mb-3"
                />
            </Link>
            <Link to={`/product/${product.slug}`} className="text-lg font-semibold text-green-900 px-2">{product.name}</Link>
            <p className="text-sm text-gray-600 mb-2 px-2">{product.excerpt}</p>
            <span className="text-orange-800 font-light text-sm px-2">{product.quantity < 15 ? `only ${product.quantity} left` : ''}</span>
            <div className="flex justify-between items-center">
                <span className="text-green-700 font-bold px-2">{`$ ${product.price}`}</span>
                
                {isSeller ? setSelectedProduct ? 
                <button onClick={handleEditProduct} to={`/${product.slug}`} className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                    Edit Product
                </button>
                :  '' : // setSelectedProduct check to avoid showing Add To Cart button for the sellers' items in marketplace and also update item outside of dashboard
                <button className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                Add to Cart
                </button> }
            </div>
        </div>
    );
}