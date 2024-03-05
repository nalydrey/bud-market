import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { IconButton } from "./buttons/IconButton.component"
import { MouseEvent } from "react"

interface CardControlProps {
    className?: string 
    onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const CardControl = ({
    className,
    onDelete,
    onEdit
}: CardControlProps) => {
    return (
        <div 
            className={`border rounded-md px-2 py-1 shadow-md bg-gray-secondary/80 flex gap-2 ${className} `} 
        >
            {
                onEdit &&
                <IconButton
                    icon={<PencilSquareIcon className='w-6 hover:text-blue-600'/>}
                    onClick={onEdit}
                />
            }
            {
                onDelete &&
                <IconButton
                    icon={<TrashIcon className='w-6 hover:text-red-600'/>}
                    onClick={onDelete}
                />
            }
        </div> 
    )
}