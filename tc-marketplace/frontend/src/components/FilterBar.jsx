import React from "react";

const FilterBar = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4  p-4 rounded-xl shadow-lg shadow-gray-400/30 mb-8">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-green-400"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
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