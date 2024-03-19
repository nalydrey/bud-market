import { MouseEvent } from "react"

interface ButtonProps {
    startIcon?: JSX.Element
    endIcon?: JSX.Element
    title: string
    onClick?: (event: MouseEvent<HTMLButtonElement>)=>void 
}

export const Button = ({
    startIcon,
    endIcon,
    title,
    onClick
}: ButtonProps) => {
    return (
        <button 
            className="px-4 py-[14px] border rounded-md border-orange-primary flex items-center gap-3 duration-200 hover:bg-orange-primary"
            onClick={onClick}
        >
            {
                startIcon &&
                <span className="w-8">
                    {startIcon}
                </span>
            }
            <span>{title}</span>
            {
                endIcon &&
                <span className="w-8">
                    {endIcon}
                </span>
            }
        </button>
    )
}