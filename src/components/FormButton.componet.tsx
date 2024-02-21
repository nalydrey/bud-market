import { MouseEvent } from "react"


interface FormButtonProps {
    title: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void 
}

export const FormButton = ({
    title,
    onClick
}: FormButtonProps) => {
    return (
        <button 
            className="border rounded-md py-1 bg-gray-500 shadow-lg hover:shadow-sm duration-100 hover:bg-gray-600 active:bg-gray-medium active:text-blue-500 active:border-blue-500"
            onClick = {onClick}
        >
            {title}
        </button>
    )
}