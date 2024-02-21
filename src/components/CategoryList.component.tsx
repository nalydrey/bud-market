import { ChevronRightIcon } from "@heroicons/react/20/solid"
// import { categories } from "../data/categories"
import { MouseEvent } from "react"
import { SubCategoryList } from "./SubCategoryList"
import { CategoryModel } from "../models/entities/category.model"


interface CategoryListProps {
    categories: CategoryModel[]
    activeEl: string
    sublist?: CategoryModel[]
    onClick?: (e: MouseEvent<HTMLButtonElement>, item: CategoryModel) => void
    onMouseEnter?: (e: MouseEvent<HTMLButtonElement>, name: CategoryModel) => void
    onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void
}

export const CategoryList = ({
    categories,
    activeEl,
    sublist = [],
    onClick,
    onMouseEnter,
    onMouseLeave
}: CategoryListProps) => {

    console.log(activeEl);

    const handleClick = (e: MouseEvent<HTMLButtonElement>, item: CategoryModel) => {
        onClick && onClick(e, item)
    }
    
    return (
        <div 
            className="absolute z-10 bg-gray-white top-full left-0 text-black flex "
            onClick={(e)=>{e.stopPropagation()}}
            onMouseLeave={onMouseLeave}
        >
            <ul className="flex flex-col gap-1 font-prosto">
                {categories.map(category => (
                    <li >
                        <button 
                            className={`p-6 w-full flex items-center justify-between gap-10 duration-200 ${activeEl === category.systemName ? 'bg-black text-white':'bg-white'}`}
                            onClick = {(e) => {handleClick(e, category)}}
                            onMouseEnter={(e) => {onMouseEnter && onMouseEnter(e, category)}}
                        >
                            <span className="first-letter:capitalize">{category.name}</span>
                           {!!category.children.length && <ChevronRightIcon className="w-8"/>} 
                        </button>
                    </li>
                ))}
            </ul>
            {
                !!sublist.length &&
                <SubCategoryList
                        list={sublist}
                        onClick={handleClick}
                />
            }
        </div>
    )
}