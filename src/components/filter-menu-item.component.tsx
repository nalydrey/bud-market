import { MouseEvent } from "react"

interface FilterMenuItemProps {
    isChanged?: boolean
    label: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const FilterMenuItem = ({
    isChanged,
    label,
    onClick
}: FilterMenuItemProps) => {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    return (
        <button 
            className="flex items-center gap-5"
            onClick = {handleClick}
        >
            <span 
                className={`w-5 h-5 rounded-sm shadow-xl ${isChanged ? 'bg-orange-primary': 'bg-gray-secondary'}`}
                
            />
            <span>{label}</span>
        </button>
    )
}