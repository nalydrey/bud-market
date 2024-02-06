import { ChevronRightIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { CategoryModel } from "../models/entities/category.model"
import { useState } from "react"

interface CategoryItemProps {
    changedElem?: number
    category: CategoryModel
    onChange?: (category: CategoryModel) => void
    onEdit?: (category: CategoryModel) => void
    onDelete?: (category: CategoryModel) => void
}

export const CategoryItem = ({
    changedElem,
    category,
    onChange,
    onDelete,
    onEdit
}: CategoryItemProps) => {

    const [open, setOpen] = useState<boolean>(false)


    const handleClickCategory =( category: CategoryModel ) => {
        setOpen(!open)
        onChange && onChange(category)
    }

    const handleChange = (category: CategoryModel) => {
        onChange && onChange(category)
    }

    const handleDelete = (category: CategoryModel) => {
        onDelete && onDelete(category)
    }
   
    const handleEdit = (category: CategoryModel) => {
        onEdit && onEdit(category)
    }

    

    return (
        <div className="">
            <button 
                className={`border max-w-sm p-1 bg-gray-400 flex gap-1 justify-between items-center ${(changedElem === category.id) ? 'text-orange-secondary':''}`}
                onClick={() => handleClickCategory(category)}
            >
                {category.name}
                {!!category.children.length && <ChevronRightIcon className="w-4"/>} 
                <div className=" flex flex-col">
                    <button
                        onClick={() => handleEdit(category)}
                    >
                        <PencilSquareIcon className="w-5"/>
                    </button>
                    <button
                        onClick={() => handleDelete(category)}
                    >
                        <TrashIcon className="w-5"/>
                    </button>
                </div>
            </button>
            {
                open &&
                <div className="pl-4 w-full">
                    {
                        category.children.map((child) => (
                            <CategoryItem 
                                changedElem={changedElem}
                                category={child}
                                onChange = {handleChange}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}