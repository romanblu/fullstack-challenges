export const InputFieldPrice = ({ onChange, value=0.00 }) => {

    const handleBlur = (e) => {
        // Force 2 decimals when leaving the field
        const num = parseFloat(e.target.value || 0.00);
        e.target.value = num.toFixed(2)
        onChange(e);
    };

    return (
        <div className="flex flex-col ">
            <label>Price</label>
            <div className="w-[150px] relative text-xl">
                <span className="absolute top-1/2 -translate-y-1/2 left-2 ">$</span>
                <input  
                    name="price"
                    onBlur={handleBlur}
                    value={value}
                    onChange={onChange} 
                    type="number"
                    onFocus={(e) => e.target.select()}
                    className="border rounded-md p-2 pl-6 "
                />
            </div>
        </div>
    )
}