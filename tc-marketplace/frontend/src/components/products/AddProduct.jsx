import { useState } from "react";
import { createProduct } from "../../api/product";
import ProductForm from "./ProductForm";

const AddProduct = ({ setActiveTab, categories }) => {
    const [message, setMessage] = useState("")

    const handleCreate = (formData) => {
        console.log(" CREATING PRODUCT WITHR FOLLOWING DATA", formData)
        createProduct(formData).then(res => {
            if(res.status === 201) {
                setMessage("Product created successfully!")
                setActiveTab("products");
            }
        }            
        ).catch(err => setMessage("Error creating product: " + err.message))
    } 

    const onDiscard = () => { setActiveTab("products"); }
    
    return (
    <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Product</h2>
      <ProductForm 
        initialData = {{}}
        onSubmit={handleCreate}
        onDiscard={onDiscard}
        categories={categories}
        onDelete={{}}
      />
        {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )
}


export default AddProduct;