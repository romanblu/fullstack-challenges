export const InputFieldNumber = ({ onChange, value=1, label, name }) => {

   

    return (
        <div className="flex flex-col w-[150px]">
            <label>{label}</label>
            <input  
                name={name}
                value={value}
                onChange={onChange} 
                type="number"
                onFocus={(e) => e.target.select()}
                className="border rounded-md p-2 pl-6 text-xl"
            />
        </div>
    )
}