import { PhotoIcon } from "@heroicons/react/20/solid"; 
import { useState } from "react";


const VariantTable = ({ variants, onUpdate, onDeleteSelected, primaryOption }) => {
    const [openGroups, setOpenGroups] = useState({});

    if (!variants.length) return null;

    // Group variants by the primary option (example "Color")
    const grouped = variants.reduce((acc, v) => {
        const key = v.optionValues[0];
        if (!acc[key]) acc[key] = [];
        acc[key] = [...acc[key], v];
        return acc;
    }, {})
    
    const toggleGroup = (groupKey) => {
        setOpenGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey]
        }));
    };

    const toggleSelect = (variantId) => {
        const updated = variants.map(v =>
            v.id === variantId ? { ...v, selected: !v.selected } : v
        );
        onUpdate(updated);
    };

    const handleChange = (variantId, field, value) => {
        const updated = variants.map(v =>
            v.id === variantId ? { ...v, [field]: value } : v
        );
        onUpdate(updated);
    };

    return (
        <div className="border p-2 rounded mt-4 bg-white">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Variants</h3>

                <button 
                    type="button"
                    onClick={onDeleteSelected}
                    className="text-red-500 font-semibold"
                >
                    Delete Selected
                </button>
            </div>

            {Object.entries(grouped).map(([groupKey, groupItems]) => (
                <div key={groupKey} className="border-t">
                    {/* --------- GROUP HEADER --------- */}
                    <div 
                        className="flex justify-between items-center py-3 cursor-pointer"
                        onClick={() => toggleGroup(groupKey)}
                    >
                        <div className="font-semibold">{primaryOption}: {groupKey}</div>
                        <div>{openGroups[groupKey] ? "▲" : "▼"}</div>
                    </div>

                    {/* --------- GROUP CONTENT --------- */}
                    {openGroups[groupKey] && (
                        <div className="ml-4 space-y-2 mb-4">
                          { console.log(groupItems)}
                            {groupItems.map((v) => (
                                <div 
                                    key={v.id}
                                    className="flex gap-3 items-center border p-2 rounded"
                                >
                                    <input
                                        type="checkbox"
                                        checked={v.selected}
                                        onChange={() => toggleSelect(v.id)}
                                    />

                                    <PhotoIcon className="w-6 h-6 text-gray-500" />

                                    {/* SHOW ALL OPTION VALUES */}
                                    <div className="w-40 text-gray-700">
                                        {Object.values(v.optionValues).join(" / ")}
                                    </div>

                                    <input
                                        className="border p-1 w-32 rounded"
                                        placeholder="SKU"
                                        value={v.sku}
                                        onChange={(e) => handleChange(v.id, "sku", e.target.value)}
                                    />

                                    <input
                                        className="border p-1 w-24 rounded"
                                        type="number"
                                        placeholder="Price"
                                        value={v.price}
                                        onChange={(e) => handleChange(v.id, "price", e.target.value)}
                                    />

                                    <input
                                        className="border p-1 w-20 rounded"
                                        type="number"
                                        placeholder="Stock"
                                        value={v.stock}
                                        onChange={(e) => handleChange(v.id, "stock", e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VariantTable;