import CategorySelector from "./CategorySelector";

const FilterBar = ({ categories, filters, setFilters }) => {
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4  p-4 rounded-xl shadow-lg shadow-gray-400/30 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => setFilters({search: e.target.value})}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-green-400"
      />

      {/*  Category filter */}
      <CategorySelector
        categoryTree={categories}
        selectedIds={filters.categories}
        onChange={(updatedCategories) => setFilters(prev => ({...prev, categories: updatedCategories}))}
      />

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => setFilters({sort: e.target.value})}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
      >
        <option value="">Sort by</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterBar;