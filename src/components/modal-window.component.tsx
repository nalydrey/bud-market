import { MouseEvent } from "react"

interface ModalWindowProps {
    open: boolean
    children: JSX.Element
    onClickEmptySpace?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ModalWindow = ({
    open,
    children,
    onClickEmptySpace
}: ModalWindowProps) => {



    return (
        <>
            {
                open &&
                <div 
                    className="top-0 left-0 w-screen h-screen fixed bg-black/70 flex justify-center items-center"
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