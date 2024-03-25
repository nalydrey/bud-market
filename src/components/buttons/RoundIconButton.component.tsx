import { MouseEvent } from "react"

interface RoundIconButtonProps {
    disabled?: boolean
    icon: JSX.Element
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const RoundIconButton = ({
    disabled = false,
    icon,
    onClick
}: RoundIconButtonProps) => {
    return (
        <button 
            disabled = {disabled}
            className={`w-10 h-10 rounded-[100%] flex items-center justify-center ${disabled? 'text-gray-400': 'hover:bg-gray-primary'}  duration-200 bg-white`}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}