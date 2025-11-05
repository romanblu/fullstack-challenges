/**
 * CategorySelector Component
 * ----------------------------------------
 * A hierarchical multi-select dropdown for selecting product categories.
 * 
 *  Supports infinite-depth nested category trees
 *  Shows selected items as removable chips
 *  Opens on hover (not click)
 *  Highlights selected categories
 *  Does NOT modify backend structure — uses `{ _id: string }` items
*
* @param {Object[]} categoryTree
*   Tree of categories, each node: 
*   {
    *     _id: string,
    *     name: string,
    *     slug: string,
    *     children?: CategoryNode[]
    *   }
*
* @param {Array<{_id: string}>} selectedIds
*   Array of currently selected category objects.
*
* @param {(updatedIds: Array<{_id: string}>) => void} onChange
*   Callback invoked whenever selection changes.
*
* @example
* <CategorySelector
*   categoryTree={tree}
*   selectedIds={[{ _id: "abc123" }]}
*   onChange={setCategories}
* />
*/


import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid"; 
import SelectedCategories from "./SelectedCategories";

const CategorySelector = ({ categoryTree, selectedIds, onChange }) => {

/**
 * Converts a recursive category tree into a flat list while keeping depth level.
 *
 * @param {Object[]} tree - category nodes
 * @param {number} level - current depth
 * @returns {Object[]} flat array with added "level" field
 */
    const flattenTree = (tree, level = 0) => {
        let result = [];
        for (const node of tree) {
            result.push({ ...node, level });
            if (node.children?.length) {
            result = result.concat(flattenTree(node.children, level + 1));
            }
        }
        return result;
    };

    const [flat, setFlat] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
      setFlat(flattenTree(categoryTree));
    }, [categoryTree]);
    
/**
 * Adds or removes a category from the selected list.
 * Works with backend structure: { _id: string }
 *
 * @param {Object} cat - category node from tree
 */
    const toggleCategory = (cat) => {
        const id = cat._id;

        const exists = selectedIds.some(item => item._id === id);

        const updated = exists
            ? selectedIds.filter(item => item._id !== id)
            : [...selectedIds, { _id: id }];

        onChange(updated);
    };

    /**
     * Expands / collapses a category subtree in the UI.
     *
     * @param {string} id - category id
     */
    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    /**
     * Dropdown open/close behavior is hover-based.
     * - Opens instantly when hovering
     * - Closes with a short delay to prevent flickering
     */
    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    };
    /**
     * Recursively renders the category tree into nested lists.
     *
     * @param {Object[]} tree
     * @returns JSX.Element
     */
    const renderTree = (tree) =>
        tree.map((cat) => (
        <div key={cat._id} className={`pl-${cat.level * 4}`}>
            <div className="flex items-center justify-between">
            <button type="button"
                onClick={() => toggleCategory(cat)}
                className={`w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${
                selectedIds.some(item => item._id === cat._id) ? "bg-gray-200" : ""
                }`}
            >
                {"\u00A0\u00A0".repeat(cat.level)} {cat.name}
            </button>

            {cat.children?.length > 0 && (
                <button type="button"
                className="px-1"
                onClick={() => toggleExpand(cat._id)}
                >
                {expanded[cat._id] ? (
                    <ChevronDownIcon className="w-5 h-5" />
                ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                )}
                </button>
            )}
            </div>

            {expanded[cat._id] && cat.children && renderTree(cat.children)}
        </div>
    ));

  const selectedObjects = flat.filter(cat => selectedIds.some(item => item._id === cat._id));


  return (
    <div className="space-y-3">
      
      <SelectedCategories selectedIds={selectedObjects} onRemove={toggleCategory} editable={true}/>

      {/* Hover Dropdown */}
      <div
        className="relative inline-block text-left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button type="button" className="border px-4 py-2 rounded-lg bg-white shadow">
          Select Categories
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-72 bg-white shadow-lg border rounded p-2 max-h-80 overflow-auto">
            {renderTree(categoryTree)}
          </div>
        )}
      </div>

    </div>
  );
}
export default CategorySelector