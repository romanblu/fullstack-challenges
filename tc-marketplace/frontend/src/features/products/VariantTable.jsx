const VariantTable = ({ variants, setVariants, onDeleteVariant }) => {
  const updateField = (index, field, value) => {
    setVariants(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  return (
    <div className="border rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Variants</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left">Option</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Compare At</th>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left w-12">Delete</th>
            </tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                
                {/* Option Value */}
                <td className="p-2">{variant.optionValues[0]}</td>

                {/* Price */}
                <td className="p-2">
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => updateField(index, "price", e.target.value)}
                    className="border p-1 rounded w-28"
                  />
                </td>

                {/* Compare at Price */}
                <td className="p-2">
                  <input
                    type="number"
                    value={variant.compareAtPrice}
                    onChange={(e) =>
                      updateField(index, "compareAtPrice", e.target.value)
                    }
                    className="border p-1 rounded w-28"
                  />
                </td>

                {/* SKU */}
                <td className="p-2">
                  <input
                    type="text"
                    value={variant.sku}
                    onChange={(e) => updateField(index, "sku", e.target.value)}
                    className="border p-1 rounded w-32"
                  />
                </td>

                {/* Stock */}
                <td className="p-2">
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => updateField(index, "stock", e.target.value)}
                    className="border p-1 rounded w-20"
                  />
                </td>

                {/* Delete */}
                <td className="p-2 text-center">
                  <button
                    type="button"
                    onClick={() => onDeleteVariant(index, variant)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantTable;