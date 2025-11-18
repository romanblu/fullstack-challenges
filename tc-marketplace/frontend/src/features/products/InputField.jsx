export const InputField = ({ label, name, value, onChange, required=false, type="text" }) => {
    
    return(
        <>
            <label>{label}</label>
            <input 
                name={name} 
                value={value} 
                onChange={onChange} 
                required={required} 
                type={type} 
                className="w-full border rounded-md p-2"
            />
        </>
    )
}