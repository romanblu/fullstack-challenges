import CategoryItem from "./CategoryItem"


const CategoryUI = ({ categories, handleSetCategories }) => {
    console.log("SELECTED CATEGORIES ", categories)
    return (
        <div>
            { categories.map(category => (
                <CategoryItem category={category} handleSetCategories={handleSetCategories}/>
            ) ) }
        </div>
    )
}

export default CategoryUI