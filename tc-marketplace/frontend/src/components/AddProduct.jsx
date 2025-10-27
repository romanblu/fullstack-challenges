import { useState } from "react";
import slugify from "slugify";
import { createProduct } from "../api/product";

const AddProduct = ({ setActiveTab }) => {
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
        createProduct(form).then(res => {
            if(res.status === 201) {
                setMessage("Product created successfully!")
                setActiveTab("products");
            }
        }            
        ).catch(err => setMessage("Error creating product: " + err.message))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleNameChange = (e) => {
        setForm({ ...form, name: e.target.value, slug: slugify(e.target.value, {lower:true}) });
    }

    const handleDiscard = () => { setActiveTab("products"); }
    
    return (
    <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Product</h2>
      
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
          Add Product
        </button>
        <button
            onClick={handleDiscard}
            type="submit"
            className="px-4 bg-gray-300 hover:bg-gray-500 text-green-950 font-semibold py-2 rounded-md shadow-md"
            >
            Discard
        </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
    </div>
    )
}


export default AddProduct;