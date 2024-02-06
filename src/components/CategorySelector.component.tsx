import { useState } from "react"
import { useGetCategoriesQuery } from "../api/createApi"
import { CategoryModel } from "../models/entities/category.model"
import { CategoryItem } from "./category-item.component"

interface CategorySelectorProps {
    onClick?: (category: CategoryModel | null) => void
}


export const CategorySelector = ({
    onClick
}: CategorySelectorProps) => {

    const { data, isSuccess } = useGetCategoriesQuery(undefined)
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
                data.categories.map(category => {
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