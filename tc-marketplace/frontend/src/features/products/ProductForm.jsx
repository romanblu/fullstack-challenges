import { useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import CategorySelector from "../../components/ui/CategorySelector.jsx";
import { InputField } from "./InputField.jsx";
import { InputFieldPrice } from "./InputFieldPrice.jsx";
import { InputFieldNumber } from "./InputFieldNumber.jsx";
import OptionManager from "./OptionManager.jsx";
import VariantManager from "./VariantManager.jsx";
import FormSection from "../../components/ui/FormSection.jsx";
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
        options:[],
        variants:[],
        ...initialData
    });

    
    // -----------------------------------
    // Load initial variants from backend
    // -----------------------------------
    useEffect(() => {
        if (!initialData?.variants) return;

        const loadedVariants = JSON.parse(JSON.stringify(initialData.variants));
        setForm(prev => ({
            ...prev, 
            variants: loadedVariants
        }))

    }, [initialData]);

    // -----------------------------------
    // Generate variants when options change
    // -----------------------------------
    useEffect(() => {

        const cleanValues = form.options.map(o =>
            o.values.filter(v => v.trim() !== "")
        );

        if (cleanValues.some(v => v.length === 0)) return;
        
        const combos = cartesian(cleanValues);
    
        const updated = combos.map((combo, index) => ({
            _id: form.variants[index]?._id || null,
            name: combo.join(" / "),
            tempId: uuid(),
            optionValues: combo,
            sku: form.variants[index]?.sku || "",
            price: form.variants[index]?.price || "",
            stock: form.variants[index]?.stock || 0,
            selected: false
        }));
        
        setForm(prev => ({
            ...prev,
            variants: updated
        }));

    }, [form.options]);

    // -----------------------------------
    // Option Manipulation
    // -----------------------------------
    const updateOption = (index, updated) => {
        setForm(prev => ({
            ...prev,
            options: prev.options.map((o, i) => i === index ? updated : o)
        }));
    };

    const addOption = () => {
        setForm(prev => ({
            ...prev,
            options: [...prev.options, { name: "", values: [""] }]
        }));
    };

    const updateVariants = (newVariants) => {
        setForm(prev => ({
            ...prev, variants: newVariants
        }));
    };

    const deleteSelectedVariants = () => {
        setForm(prev => ({
            ...prev,
            variants: prev.variants.filter(v => !v.selected)
        }));
    }

    const deleteOption = (index) => {
        setForm(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    // -----------------------------------
    // Form Logic
    // -----------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
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
        const cleanOptions = form.options.map(opt => ({
            name: opt.name.trim(),
            values: opt.values
                .map(v => v.trim())
                .filter(v => v !== "")
        }));
        onSubmit({ ...form, options: cleanOptions });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
            <FormSection>
                <InputField label="Product Name" name="name" value={form.name} onChange={handleNameChange} required />
                <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} required />
                <InputField label="Species" name="species" value={form.species} onChange={handleChange} required />
            </FormSection>

            <FormSection>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    />
            </FormSection>

            <FormSection>
                <InputFieldPrice value={form.price} onChange={handleChange} />
            </FormSection>

            <FormSection>
                <InputFieldNumber value={form.quantity} onChange={handleChange} name="quantity" label="Quantity" />
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
            </FormSection>

            <FormSection>
                <InputField label="Main Image URL" name="mainImage" value={form.mainImage} onChange={handleChange} />
            </FormSection>
            <FormSection>
                <CategorySelector
                    categoryTree={categoryTree}
                    selectedIds={form.categories}
                    onChange={(newIds) => setForm(prev => ({ ...prev, categories: newIds }))}
                    />
            </FormSection>

            <FormSection>
                <OptionManager 
                    options={form.options} 
                    onChange={updateOption} 
                    onDelete={() => deleteOption(index)} 
                    addOption={addOption}
                    />
                <VariantManager 
                    options={form.options} 
                    variants={form.variants} 
                    onChange={updateVariants} 
                    onDeleteSelected={deleteSelectedVariants} 
                    primaryOption={form.options?.[0]?.name || "Option"}
                    />
            </FormSection>

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