import { MouseEvent } from "react"

interface RoundIconButtonProps {
    icon: JSX.Element
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const RoundIconButton = ({
    icon,
    onClick
}: RoundIconButtonProps) => {
    return (
        <button 
            className="w-10 h-10 rounded-[100%] flex items-center justify-center hover:bg-gray-primary duration-200 bg-white"
            onClick={onClick}
        >
            {icon}
        </button>
    )
}