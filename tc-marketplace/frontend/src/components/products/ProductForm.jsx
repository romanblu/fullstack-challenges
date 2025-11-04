import { useState, useEffect } from "react";
import slugify from "slugify";
import CategorySelector from "../ui/CategorySelector.jsx";
const ProductForm = ({
    initialData = {},
    onSubmit,
    onDiscard,
    CategoryTree,
    }) => {

        const [form, setForm] = useState({
        name: "",
        slug: "",
        species: "",
        description: "",
        price: "",
        quantity: "",
        mainImage: "",
        productType: "",
        categories: [],
        ...initialData    // populate for edit mode
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleNameChange = (e) => {
        setForm({ ...form, name: e.target.value, slug: slugify(e.target.value, {lower:true}) });
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    } 

    return (
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
            name="mainImage"
            placeholder="Main Image URL"
            value={form.mainImage}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            />

            {/* Product Type */}
            <select
                name="productType"
                value={form.productType}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2"
            >
                <option value="">Select Product Type</option>
                <option value="plant">Plant</option>
                <option value="consumable">Consumable</option>
                <option value="equipment">Equipment</option>
                <option value="kit">Kit</option>
                <option value="digital">Digital</option>
            </select>
            <CategorySelector 
                categoryTree={CategoryTree}
                selectedIds={form.categories}
                onChange={(newIds) => setForm(prev => ({ ...prev, categories: newIds }))}
            />
        
            <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md"
            >
            Submit
            </button>
            <button
                onClick={onDiscard}
                type="submit"
                className="px-4 bg-gray-300 hover:bg-gray-500 text-green-950 font-semibold py-2 rounded-md shadow-md"
                >
                Discard
            </button>
        </form>
    )
}

export default ProductForm