import { MouseEvent } from "react"

interface ModalWindowProps {
    className?: string
    open: boolean
    children: JSX.Element
    onClickEmptySpace?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ModalWindow = ({
    className,
    open,
    children,
    onClickEmptySpace
}: ModalWindowProps) => {



    return (
        <>
            {
                open &&
                <div 
                    className={`top-0 left-0 w-screen h-screen fixed bg-black/70 flex justify-center items-center ${className}`}
                    onClick={onClickEmptySpace}
                >
                    <div
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        {children}
                    </div>
                </div>
            }
        
        </>
    )
}