import { CategoryModel } from "../models/entities/category.model"

interface SubCategoryListProps {
    list: CategoryModel []
    onClick?: (item: CategoryModel) => void
}

export const SubCategoryList = ({
    list,
    onClick
}: SubCategoryListProps) => {

    const handleClick = (item: CategoryModel) => {
        onClick && onClick(item)
    }

    return (
        <ul 
            className="absolute top-0 right-0 translate-x-full min-h-full px-12 py-8  w-[550px] bg-white grid grid-cols-fill "
        >
            {list.map(item => (
                <li >
                    <button 
                        className=" first-letter:capitalize hover:text-orange-primary"
                        onClick={() => handleClick(item)}
                    >{item.name}</button>
                </li>
            ))}
        </ul>
    )
}