import { XMarkIcon } from "@heroicons/react/24/outline"
import { LinearProgress } from "@mui/material"
import { MouseEvent } from "react"

interface FormContainerProps {
    isLoading?: boolean
    children: JSX.Element
    title?: string
    onClose?: (e: MouseEvent<HTMLButtonElement>) => void

}


export const FormContainer = ({
    isLoading,
    children,
    title,
    onClose
}: FormContainerProps) => {


    return (
        <div className="relative border border-gray-dark  bg-gray-400/80 rounded-xl shadow-xl w-80 p-1">
            <div className="p-3">
                {title && <h3 className="text-center font-bold text-2xl mb-3">{title}</h3>}
                {children}
                <button 
                    className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-gray-400 shadow-sm w-8 h-8 border border-gray-medium rounded-xl"
                    onClick={onClose}
                >
                    <XMarkIcon className="text-red-500"/>
                </button>
            </div>
            <LinearProgress value={0} variant={isLoading ? 'indeterminate': 'determinate'}  className="rounded-lg"/>
        </div>
    )
}