import { useState } from "react"
import { deleteProduct, updateProduct } from "../../api/product";
import ProductForm from "./ProductForm";

const EditProduct = ({ setActiveTab, setSelectedProduct, selectedProduct, categoryTree }) => {

    const [message, setMessage] = useState("")

    const handleUpdate = (form) => {
        updateProduct(selectedProduct._id, form).then(res => {

            if(res.status === 201) {
                setMessage("Product updated successfully!")
                setSelectedProduct(res.data);
                setActiveTab("products");
            }
        }).catch(err => setMessage("Error updating product: " + err.message))
    }

    const handleDiscard = () => {
        setActiveTab("products");
    }

    const handleDelete = () => {
        deleteProduct(selectedProduct._id).then(() => {
            setMessage("Product deleted successfully!");
            setActiveTab("products");
        }).catch(err => setMessage("Error deleting product: " + err.message))
    }

    return (
        <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
            
            <ProductForm 
                initialData = {selectedProduct}
                onSubmit={handleUpdate}
                onDiscard={handleDiscard}
                categoryTree={categoryTree}
                onDelete={handleDelete}
            />

            {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )

}

export default EditProduct;