import { MouseEvent } from "react"


interface SidePanelButtonProps {
    title: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}


export const SidePanelButton = ({
    title,
    onClick
}: SidePanelButtonProps) => {
    return (
        <button 
            className="p-4 hover:text-orange-primary border-b w-full text-start"
            onClick={onClick}
        >
            {title}
        </button>
    )
}