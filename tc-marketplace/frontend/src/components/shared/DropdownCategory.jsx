import { useRef, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid"; 

const DropdownCategory = ({ categoryTree , selectedCategory, setSelectedCategory }) => {
  const [expanded, setExpanded] = useState({});
  const [isOpen, setIsOpen] = useState(false); // dropdown open state
  const timeoutRef = useRef(null);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = (category, level = 0) => (
    <div key={category._id} className={`pl-${level * 4}`}>
      <div className="flex items-center justify-between">
        {/* Category name */}
        <button
          className={`text-left py-1 px-2 w-full hover:bg-gray-100 rounded ${
            selectedCategory.slug === category.slug ? "bg-gray-200" : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
           { "\u00A0\u00A0".repeat(level) + category.name}
        </button>

        {/* Expand icon */}
        {category.children?.length > 0 && (
          <button
            onClick={() => toggleExpand(category._id)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            {expanded[category._id] ?  (
              <ChevronDownIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {/* Render children if expanded */}
      {expanded[category._id] &&
         category.children.map((child) => renderCategory(child, level + 1))}
    </div>
  );


    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

  const handleMouseLeave = () => {
    // add a small delay to allow mouse to move into dropdown
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative inline-block text-left min-w-[150px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button className="border border-gray-300 text-left w-full rounded-lg px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
        {selectedCategory.name || "Select Category"}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-auto">
            {/* Show All Products button */}
          <div className="border-b border-gray-200">
            <button
              className={`text-left w-full px-2 py-1 hover:bg-gray-100 rounded ${
                selectedCategory === "" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              Show All Products
            </button>
          </div>
          {/* Category list */}
          {categoryTree.map((parent) => renderCategory(parent))}
        </div>
      )}
    </div>
  );
};

export default DropdownCategory;