export default function ProductCard({ product}) {
    return (
        <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition flex flex-col h-full justify-between">
            <img
                src={product.image}
                alt={product.name}
                className="rounded-sm w-full h-56 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-green-900 px-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2 px-2">{product.description}</p>
            <span className="text-orange-800 font-light text-sm px-2">{product.quantity < 15 ? `only ${product.quantity} left` : ''}</span>
            <div className="flex justify-between items-center">
                <span className="text-green-700 font-bold px-2">{`$ ${product.price}`}</span>
                
                <button className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                Add to Cart
                </button>
            </div>
        </div>
    );
}