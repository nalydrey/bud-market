import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { categories } from "../data/categories"
import { MouseEvent } from "react"
import { SubCategoryList } from "./SubCategoryList"


interface CategoryListProps {
    activeEl: string
    sublist?: string[]
    onClick?: (e: MouseEvent<HTMLButtonElement>, name: string) => void
    onMouseEnter?: (e: MouseEvent<HTMLButtonElement>, name: string) => void
    onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void
}

export const CategoryList = ({
    activeEl,
    sublist = [],
    onClick,
    onMouseEnter,
    onMouseLeave
}: CategoryListProps) => {

    console.log(activeEl);
    
    return (
        <div 
            className="absolute bg-gray-white top-full left-0 text-black flex "
            onClick={(e)=>{e.stopPropagation()}}
            onMouseLeave={onMouseLeave}
        >
            <ul className="flex flex-col gap-1 font-prosto">
                {categories.map(category => (
                    <li >
                        <button 
                            className={`p-6 w-full flex items-center justify-between gap-10 duration-200 ${activeEl === category.name ? 'bg-black text-white':'bg-white'}`}
                            onClick = {(e) => {onClick && onClick(e, category.name)}}
                            onMouseEnter={(e) => {onMouseEnter && onMouseEnter(e, category.name)}}
                        >
                            <span className="first-letter:capitalize">{category.name}</span>
                            <ChevronRightIcon className="w-8"/>
                        </button>
                    </li>
                ))}
            </ul>
            {
                !!sublist.length &&
                <SubCategoryList
                        list={sublist}
                />
            }
        </div>
    )
}