import VariantTable from "./VariantTable"

const VariantManager = ({options, variants, onChange, onDeleteSelected}) => {
    
    return (
        <div>
            <VariantTable variants={variants} onUpdate={onChange} onDeleteSelected={onDeleteSelected} primaryOption={options?.[0]?.name || "Option"}/>
        </div>
    )
}

export default VariantManager