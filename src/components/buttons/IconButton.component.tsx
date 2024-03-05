import { MouseEvent } from "react"

interface IconButtonProps {
    icon: JSX.Element
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const IconButton = ({
    icon,
    onClick
}: IconButtonProps) => {
    return (
        <button
            className="w-6 h-6"
            onClick={onClick}
        >
            {icon}
        </button>
    )
}