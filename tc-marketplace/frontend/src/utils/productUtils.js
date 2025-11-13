

export const filterAndSortProducts = (products, { search, sort, categories }) => {
    let filtered = [...products]
    if(search){
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    if(categories && categories.length > 0){
        const selectedIds = categories.map((c) => c._id);

        filtered = filtered.filter((p) =>
        selectedIds.includes(p.category?._id || p.category) // supports either populated object or ID string
        );
    }

    if(sort==="low-high") filtered.sort((a, b) => a.price - b.price);
    if(sort==="high-low") filtered.sort((a, b) => b.price - a.price);

    return filtered
}