

const SelectedCategories = ({ selectedIds, onRemove={}, editable=false }) => {
    if(!selectedIds) return <p>Loading...</p>
    const isEditable = editable && onRemove
    return (
        <div className="flex flex-wrap gap-2">
            {selectedIds.map((cat) => (
            
                <div className="px-3 py-1 bg-green-200 text-green-800 rounded-full hover:bg-green-300">
                    {   isEditable ?
                        <button type="button"
                        key={cat._id}
                        onClick={() => onRemove(cat)}
                        className="">
                            {cat.name}  ✕
                        </button>
                        : 
                        <p>{cat.name}</p>
                    }
                </div>
            
            ))}
      </div>
        
    )
}

export default SelectedCategories