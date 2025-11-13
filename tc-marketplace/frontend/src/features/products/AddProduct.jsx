import { useEffect, useState } from "react";
import { createProduct } from "../../api/product";
import ProductForm from "./ProductForm";

const AddProduct = ({ setActiveTab, categoryTree }) => {
    const [message, setMessage] = useState("")
    const [storeId, setStoreId] = useState(null)

    useEffect(() => {
        try{
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.store) setStoreId(user.store);
        }catch(err){
            console.error("Store ID not found", err.message)
        }
    }, [])

    const handleCreate = async (formData) => {
        try{
            const res = createProduct(formData)
            if(res.status === 201) {
                setMessage("Product created successfully!")
                setActiveTab("products");
            }

        } catch(err) {
            console.error(err)
        }
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
      />
        {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )
}


export default AddProduct;