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

const cartesian = (arrays) => {
    if (arrays.length === 0) return [];
    return arrays.reduce(
        (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
        [[]]
    );
};

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
        ...initialData
    });

    // MULTIPLE OPTIONS (Shopify style)
    const [options, setOptions] = useState([
        
    ]);

    const [variants, setVariants] = useState([]);

    // -----------------------------------
    // Load initial variants from backend
    // -----------------------------------
    useEffect(() => {
        if (!initialData?.variants) return;

        setVariants(JSON.parse(JSON.stringify(initialData.variants)));

        // Convert variants → options
        if (initialData.variants.length > 0) {
            const collected = {};

            initialData.variants.forEach(v => {
                v.optionValues.forEach((value, index) => {
                    if (!collected[index]) collected[index] = new Set();
                    collected[index].add(value);
                });
            });

            const restoredOptions = Object.keys(collected).map(i => ({
                name: `Option ${Number(i) + 1}`,
                values: Array.from(collected[i])
            }));

            setOptions(restoredOptions);
        }
    }, [initialData]);

    // -----------------------------------
    // Generate variants when options change
    // -----------------------------------
    useEffect(() => {
        const cleanValues = options.map(o =>
            o.values.filter(v => v.trim() !== "")
        );

        if (cleanValues.some(v => v.length === 0)) return;

        const combos = cartesian(cleanValues);

        const updated = combos.map((combo, index) => ({
            _id: variants[index]?._id || null,
            optionValues: combo,
            sku: variants[index]?.sku || "",
            price: variants[index]?.price || "",
            stock: variants[index]?.stock || 0,
            selected: false
        }));

        setVariants(updated);

    }, [options]);

    // -----------------------------------
    // Option Manipulation
    // -----------------------------------
    const updateOption = (index, updated) => {
        setOptions(prev => {
            const copy = [...prev];
            copy[index] = updated;
            return copy;
        });
    };

    const addOption = () => {
        if (options.length >= 3) return;
        setOptions(prev => [...prev, { name: "", values: [""] }]);
    };

    const deleteOption = (index) => {
        setOptions(prev => prev.filter((_, i) => i !== index));
    };

    // -----------------------------------
    // Form Logic
    // -----------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleNameChange = (e) => {
        setForm({
            ...form,
            name: e.target.value,
            slug: slugify(e.target.value, { lower: true })
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDifference = diffObjects(initialData, form);
        const variantsDifference = diffVariants(initialData.variants, variants);
        onSubmit({ ...formDifference, variantsDifference });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Product Name" name="name" value={form.name} onChange={handleNameChange} required />
            <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
            <InputField label="Species" name="species" value={form.species} onChange={handleChange} required />

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
            />

            <InputFieldPrice value={form.price} onChange={handleChange} />
            <InputFieldNumber value={form.quantity} onChange={handleChange} name="quantity" label="Quantity" />
            <InputField label="Main Image URL" name="mainImage" value={form.mainImage} onChange={handleChange} />

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

            {/* ---------------- OPTIONS ---------------- */}

            {options.map((option, index) => (
                <VariantOptionEditor
                    key={index}
                    option={option}
                    onChange={updated => updateOption(index, updated)}
                    onDelete={() => deleteOption(index)}
                />
            ))}

            {options.length < 3 && (
                <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 mt-2"
                >
                    + Add another option
                </button>
            )}

            {/* ---------------- VARIANTS TABLE ---------------- */}
            <VariantTable
                variants={variants}
                onUpdate={setVariants}
                primaryOption="Size"
                onDeleteSelected={() =>
                    setVariants(prev => prev.filter(v => !v.selected))
                }
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
    );
};

export default ProductForm;