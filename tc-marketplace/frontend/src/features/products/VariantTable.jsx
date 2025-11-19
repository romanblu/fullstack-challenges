import { PhotoIcon } from "@heroicons/react/20/solid"; 


const VariantTable = ({ variants, onUpdate, onDeleteSelected }) => {

    const toggleSelect = (index) => {
        const updated = [...variants];
        updated[index].selected = !updated[index].selected;
        onUpdate(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        onUpdate(updated);
    };

    if (variants.length === 0) return 

    return (
        <div className="border p-2 rounded mt-4">
            <div className="flex justify-between">
                <h3 className="font-semibold mb-2">Variants</h3>
                <button 
                    type="button"
                    onClick={onDeleteSelected}
                    className="text-red-500 font-semibold"
                >
                    Delete Selected
                </button>
            </div>

            {variants.map((v, i) => (
                <div key={i} className="flex gap-3 items-center mb-2 h-[60px] border-t-1 my-auto">
                    <input 
                        type="checkbox"
                        checked={v.selected}
                        onChange={() => toggleSelect(i)}
                    />

                    <PhotoIcon className="w-6 h-6 mx-[10px]"/>
                    <div className="w-32">{v.optionValue}</div>

                    <input
                        className="border p-1 w-32"
                        placeholder="SKU"
                        value={v.sku}
                        onChange={(e) => handleChange(i, "sku", e.target.value)}
                    />

                    <input
                        className="border p-1 w-24"
                        placeholder="Price"
                        type="number"
                        value={v.price}
                        onChange={(e) => handleChange(i, "price", e.target.value)}
                    />

                    <input
                        className="border p-1 w-20"
                        placeholder="Stock"
                        type="number"
                        value={v.stock}
                        onChange={(e) => handleChange(i, "stock", e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default VariantTable