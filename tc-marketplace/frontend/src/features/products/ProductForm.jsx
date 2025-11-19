import { useEffect, useState } from "react";
import slugify from "slugify";
import CategorySelector from "../../components/ui/CategorySelector.jsx";
import VariantEditor from "./VariantEditor.jsx";
import VariantTable from "./VariantTable.jsx";
import VariantOptionEditor from "./VariantOptionEditor.jsx"
import { diffObjects } from "../../utils/diff.js";
import { diffVariants } from "../../utils/diffVariants.js";
import { InputField } from "./InputField.jsx";
import { InputFieldPrice } from "./InputFieldPrice.jsx";
import { InputFieldNumber } from "./InputFieldNumber.jsx";

const ProductForm = ({
    initialData = {},
    onSubmit,
    onDiscard,
    categoryTree,
    }) => {

    const [form, setForm] = useState({
    name: "",
    slug: "",
    species: "",
    description: "",
    price: 0.00,
    quantity: 1,
    mainImage: "",
    productType: "",
    categories: [],
    ...initialData    // populate for edit mode
    });

    const [option, setOption] = useState({
        name: "",
        values: []
    });

    // TODO: create a hook for loading form data - category tree and product type list

    const [variants, setVariants] = useState([]);

    useEffect(() => {
        if (!initialData || !initialData.variants) return;

        const cloned = JSON.parse(JSON.stringify(initialData.variants))
        // Load variants into state
        setVariants(cloned);

        // Infer option name & values from existing variants
        if (initialData.variants.length > 0) {
            const optionName = initialData.variants[0].name;
            const optionValues = [
                ...new Set(initialData.variants.flatMap(v => v.optionValues))
            ];

            setOption({
                name: optionName,
                values: optionValues
            });
        }
    }, [initialData])

    useEffect(() => {
        if (!option.values.length) return;

        const newVariants = option.values.map((v, index) => ({
            _id: variants[index]?._id || null,  // keep id if editing existing
            optionValue: v,
            sku: variants[index]?.sku || "",
            price: variants[index]?.price || "",
            stock: variants[index]?.stock || 0,
            selected: false
        }));

        setVariants(newVariants);
    }, [option.values]);

    const generateVariants = () => {
        const newVariants = option.values.map(v => ({
            name: option.name,
            optionValues: [v],
            price: 0,
            compareAtPrice: "",
            sku: "",
            stock: 0,
            images: []
        }));
        setVariants(newVariants);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleNameChange = (e) => {
        setForm({ ...form, name: e.target.value, slug: slugify(e.target.value, {lower:true}) });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const difference = diffObjects(initialData, form)
        const differenceVariants = diffVariants(initialData.variants, variants)
        onSubmit({...difference, variants})
    } 

    const handleVariantChange = (option) => {
        setOption(option)
    }
    console.log(variants)
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Product Name" name="name" value={form.name} onChange={handleNameChange} required={true}/>
           
            <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} required={true}/>
          
            <InputField label="Species" name="species" value={form.species} onChange={handleChange} required={true}/>
         
            {/* TODO: create component for parsing HTML, add button for template generation  */}
            <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            />
            
            <InputFieldPrice value={form.price} onChange={handleChange}  />

            <InputFieldNumber value={form.quantity} onChange={handleChange} name="quantity" label="Quantity"/>
            
            <InputField label="Main Image URL" name="nameImage" value={form.mainImage} onChange={handleChange} />

            {/* Product Type */}
                {/* TODO: Refactor */}
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
                categoryTree={categoryTree}
                selectedIds={form.categories}
                onChange={(newIds) => setForm(prev => ({ ...prev, categories: newIds }))}
            />
            {/* Variants */}
            <VariantOptionEditor 
                option={option} 
                onChange={handleVariantChange}
                onDeleteOption={() => setOption({name:"", values:[]})}
            />

            <VariantTable 
                variants={variants}
                onUpdate={setVariants}
                onDeleteSelected={() => {
                    setVariants(prev => prev.filter(v => !v.selected));
                }}
            />

            <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md"
            >
            Submit
            </button>
            <button
                onClick={onDiscard}
                type="button"
                className="px-4 bg-gray-300 hover:bg-gray-500 text-green-950 font-semibold py-2 rounded-md shadow-md"
                >
                Discard
            </button>
        </form>
    )
}

export default ProductForm