import { InputHTMLAttributes } from "react"

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

export const MainInput = ({
   ...props
}: MainInputProps) => {
    return (
        <input 
            className="border border-t-0 border-l-0 border-r-0 border-b-black outline-none"
            type="text" 
            {...props}
        />
    )
}