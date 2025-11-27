import { useEffect, useState } from "react";

const VariantOptionEditor = ({ index, option, onChange, onDeleteOption }) => {
    // const [name, setName] = useState(option?.name ?? "");
    // const [values, setValues] = useState(option?.values?.length ? option.values : [""]);
    const [editing, setEditing] = useState(true);

    const {name ,values } = option

    const updateName = (newName) => {
        onChange(index, { ...option, name: newName });
    };

    const updateValue = (i, newValue) => {
        let updatedValues = [...values];
        updatedValues[i] = newValue;

        // If last item was typed into, add new empty string
        if (i === values.length - 1 && newValue.trim() !== "") {
            updatedValues.push("");
        }

        // Remove empty values except last
        updatedValues = updatedValues.filter((v, idx) => 
            v.trim() !== "" || idx === updatedValues.length - 1
        );

        onChange(index, { ...option, values: updatedValues });
    };

    const removeValue = (i) => {
        onChange(index, {
            ...option,
            values: values.filter((_, idx) => idx !== i)
        });
    };    

    const handleDone = () => {
        // Disallow collapsing if no name
        if (!name.trim()) return;
        setEditing(false);
    };

    return (
        <div className="border rounded-md bg-white p-4 shadow-sm">

            {/* -------------------- EDIT MODE -------------------- */}
            {editing && (
                <div className="space-y-4">

                    {/* Option Name */}
                    <div>
                        <label className="block font-semibold text-sm mb-1">Option name</label>
                        <input
                            type="text"
                            className="border p-2 w-full rounded"
                            placeholder="e.g. Size, Stage"
                            value={name}
                            onChange={(e) => updateName(e.target.value)}
                        />
                    </div>

                    {/* Option Values */}
                    <div>
                        <label className="block font-semibold text-sm mb-1">Option values</label>

                        <div className="space-y-2">
                            {values.map((value, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        className="border p-2 rounded flex-1"
                                        placeholder="Enter value..."
                                        value={value}
                                        onChange={(e) => updateValue(index, e.target.value)}
                                    />

                                    {/* Show delete button for all but last empty input */}
                                    {!(index === values.length - 1 && value === "") && (
                                        <button
                                            type="button"
                                            onClick={() => removeValue(index)}
                                            className="text-red-500 hover:text-red-700 text-lg px-2"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleDone}
                            className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
                        >
                            Done
                        </button>

                        <button
                            type="button"
                            onClick={onDeleteOption}
                            className="text-red-600 hover:text-red-800"
                        >
                            Delete option
                        </button>
                    </div>
                </div>
            )}

            {/* -------------------- VIEW MODE -------------------- */}
            {!editing && (
                <div
                    className="cursor-pointer"
                    onClick={() => setEditing(true)}
                >
                    <h3 className="font-semibold text-md mb-2">{name}</h3>

                    <div className="flex flex-wrap gap-2">
                        {values.map((value, i) => value.length > 0 ? (
                            
                            <span
                                key={i}
                                className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                            >
                                {value}
                            </span> 
                            
                        ) : '')}
                    </div>
                </div>
            )}
        </div>
    );
};
export default VariantOptionEditor