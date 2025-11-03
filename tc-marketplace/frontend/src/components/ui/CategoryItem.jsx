import { XMarkIcon } from "@heroicons/react/20/solid"; 

const CategoryItem = ({ category, handleSetCategories }) => {


    return (
        <button onClick={() => handleSetCategories(category)} className="py-2 px-2 rounded-lg text-left bg-gray-300 hover:bg-gray-400 mx-1 my-1"> 
            <div className="flex">
                {category.name} <XMarkIcon className="w-6 h-6" />
            </div>
        </button>
    )
}

export default CategoryItem