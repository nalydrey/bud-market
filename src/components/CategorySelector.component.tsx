import { useState } from "react"
import { CategoryModel } from "../models/entities/category.model"
import { CategoryItem } from "./category-item.component"
import { useGetTreeCategoriesQuery } from "../api/categoryApi"

interface CategorySelectorProps {
    onClick?: (category: CategoryModel | null) => void
}


export const CategorySelector = ({
    onClick
}: CategorySelectorProps) => {

    const { data: categories, isSuccess } = useGetTreeCategoriesQuery(undefined)
    const [changedCategory, setCategory] = useState<CategoryModel | null>(null) 


    const handleChange = (category: CategoryModel) => {
        setCategory(category)
    }

    const handleClick = () => {
        onClick && onClick(changedCategory)
    }


    return (
        <div>
            {
                isSuccess &&
                categories.map(category => {
                    return (
                        <CategoryItem 
                            changedElem={changedCategory?.id}
                            category={category}
                            onChange={handleChange}
                        />
                    )
                })
            }
            <button 
                className="text-white"
                onClick={handleClick}
            >Обрати</button>
        </div>
    )
}