import { MouseEvent } from "react"

interface UniButtonProps {
    className?: string
    type?: "button" | "submit" | "reset"
    form?: string
    title: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const UniButton = ({
    className,
    type,
    form,
    title = 'button',
    onClick
}: UniButtonProps) => {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    return (
        <button 
            type={type}
            form={form}
            className={`bg-orange-primary duration-200 hover:bg-black rounded-md active:bg-orange-secondary px-8 py-3 uppercase text-white ${className}`}
            onClick={handleClick}
        >{title}</button>
    )
}