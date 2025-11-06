import { useState } from "react";

const VariantEditor = ({ option, setOption, onGenerateVariants }) => {
  const [valueInput, setValueInput] = useState("");

  const addValue = () => {
    const val = valueInput.trim();
    if (!val) return;
    if (option.values.includes(val)) return;

    setOption(prev => ({
      ...prev,
      values: [...prev.values, val]
    }));

    setValueInput("");
  };

  const removeValue = (value) => {
    const newValues = option.values.filter(v => v !== value);
    setOption(prev => ({
      ...prev,
      values: newValues
    }));
  };

  return (
    <div className="space-y-4">

      {/* Option Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Option Name</label>
        <input
          type="text"
          className="border rounded-md px-3 py-2 w-full"
          placeholder="e.g. Stage, Size, Color"
          value={option.name}
          onChange={(e) =>
            setOption(prev => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* Option Values (tags) */}
      <div>
        <label className="block text-sm font-medium mb-1">Option Values</label>

        {/* Input + Add button */}
        <div className="flex gap-2">
          <input
            type="text"
            className="border rounded-md px-3 py-2 flex-1"
            placeholder="e.g. In Vitro"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addValue()}
          />
          <button
            type="button"
            onClick={addValue}
            className="px-4 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Add
          </button>
        </div>

        {/* Tag list */}
        <div className="flex flex-wrap gap-2 mt-3">
          {option.values.map((val) => (
            <span
              key={val}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
            >
              {val}
              <button
                type="button"
                onClick={() => removeValue(val)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Generate Variants Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={onGenerateVariants}
          className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold px-4 py-2 rounded-md"
        >
          Generate Variants
        </button>
      </div>
    </div>
  );
};

export default VariantEditor;