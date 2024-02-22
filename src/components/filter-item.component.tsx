import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"


interface FilterItemProps {
    children: JSX.Element 
    title: string
    className?: string
}

export const FilterItem = ({
    title,
    children,
    className
}: FilterItemProps) => {

    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className={`bg-gray-dark text-white ${className} first:rounded-t-md last:rounded-b-md`}>
            <button
                className="flex items-center justify-between p-4 border-b-2 w-full"
                onClick={handleClick}
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-7 ${open ? 'rotate-180': ''}`}/>
            </button>
            <div className={ `${open ? 'max-h-[180px]': 'max-h-0'}  text-orange-primary overflow-hidden duration-200 overflow-y-auto`}>
                {children}
            </div>
        </div>
    )
}