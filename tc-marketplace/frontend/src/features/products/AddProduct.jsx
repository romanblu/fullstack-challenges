import { useState } from "react";
import { createProduct } from "../../api/product";
import ProductForm from "./ProductForm";
import { useQuery } from '@tanstack/react-query';

const AddProduct = ({ setActiveTab, categoryTree }) => {
    const [message, setMessage] = useState("")
    const storeId = JSON.parse(localStorage.getItem("user")).store

    const handleCreate = (formData) => {
        console.log(formData)
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
    <div className="max-w-[650px] mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Product</h2>
      <ProductForm 
        initialData = {{store: storeId}}
        onSubmit={handleCreate}
        onDiscard={onDiscard}
        categoryTree={categoryTree}
        onDelete={{}}
      />
        {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )
}


export default AddProduct;