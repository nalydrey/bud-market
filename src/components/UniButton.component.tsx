import { MouseEvent } from "react"

interface UniButtonProps {
    title: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const UniButton = ({
    title = 'button',
    onClick
}: UniButtonProps) => {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    return (
        <button 
            className=" bg-orange-primary duration-200 hover:bg-black rounded-md px-8 py-3 uppercase"
            onClick={handleClick}
        >{title}</button>
    )
}