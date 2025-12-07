import VariantOptionEditor from "./VariantOptionEditor"

const OptionManager = ({ options, onChange, onDelete, addOption}) => {
    
    return (
        <div>
            {options.map((option, index) => (
                <VariantOptionEditor
                    key={index}
                    index={index}
                    option={option}
                    onChange={(index,updated) =>  onChange(index, updated)}
                    onDelete={() => onDelete(index)}
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
        </div>
    )
}

export default OptionManager