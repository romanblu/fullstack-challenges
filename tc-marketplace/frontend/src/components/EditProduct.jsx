import { useEffect, useState } from "react"
import { updateProduct } from "../api/product";
import slugify from "slugify";

const EditProduct = ({ setActiveTab, setSelectedProduct, selectedProduct }) => {
    useEffect(() => {
        setForm(selectedProduct);
    }, []);

    const [form, setForm] = useState({
        name: "",
        slug: "",
        species: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
    })

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(selectedProduct._id, form).then(res => {
            if(res.status === 201) {
                setMessage("Product updated successfully!")
                setSelectedProduct(res.data);
                setActiveTab("products");
            }
        }).catch(err => setMessage("Error updating product: " + err.message))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleNameChange = (e) => {

        setForm({ ...form, name: e.target.value, slug: slugify(e.target.value, {lower:true}) });
        
    }

    return (
        <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleNameChange}
                required
                className="w-full border rounded-md p-2"
                />

                <input
                type="text"
                name="slug"
                placeholder="Slug (unique identifier)"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2"
                />

                <input
                type="text"
                name="species"
                placeholder="Species"
                value={form.species}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2"
                />

                <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                />

                <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2"
                />

                <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                />

                <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                />

                <button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md"
                >
                Update Product
                </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )

}

export default EditProduct;