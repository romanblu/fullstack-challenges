

export const MetaForm = ({meta, setMeta}) => {
    const handleChange = (e) =>
    setMeta({ ...meta, [e.target.name]: e.target.value });

    const fields = [
        ["title", "Title"],
        ["date", 'Date'],
        ["author", 'Author'],
        ["slug", 'Slug'],
        ["image", 'Image'],
        ["tags", "Tags"],
        ["excerpt" , 'Excerpt']
    ]

    return (
        <div className="grid grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {
                fields.map(([name, label]) => (
                    <div key={name}>
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    <input
                        name={name}
                        value={meta[name]}
                        onChange={handleChange}
                        placeholder={label}
                        className="border rounded p-2 w-full"
                    />
                    </div>
                ))
            }
        </div>
    )
}