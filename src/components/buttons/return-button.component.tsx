import { MouseEvent } from "react"

interface ReturnButtonProps {
    title: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ReturnButton = ({
    title,
    onClick
}: ReturnButtonProps) => {
    return (
        <button 
            className="duration-200 border p-3 rounded-md font-semibold text-xl bg-orange-primary hover:shadow-xl text-white"
            onClick={onClick}
        >
            {title}
        </button>
    )
}