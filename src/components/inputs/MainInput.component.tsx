import { ChangeEvent, HTMLInputTypeAttribute } from "react"

interface MainInputProps  {
    id?: string
    name?: string
    title?:string
    placeholder?: string 
    type?: HTMLInputTypeAttribute
    value?: string | number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MainInput = ({
    placeholder,
    type,
    value,
    name,
    title,
    onChange
}: MainInputProps) => {

    

    return (
       <div className="relative shadow-lg">
            <input 
                id={name}
                value={value}
                name={name}
                autoComplete="off"
                className=" peer border-b-black outline-none w-full p-2 rounded-t-md"
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
            <label 
                htmlFor={name}
                className="border-b-4 border-gray-medium rounded-b-md block peer-focus:border-blue-700 duration-300"
            />
            <label 
                htmlFor={name}
                className={`absolute select-none ${value ? '-top-5 left-0': 'left-2 top-2'}  font-bold text-gray-medium peer-focus:-top-5 peer-focus:left-0 duration-300 peer-focus:text-blue-700` }
            >
                {title}
            </label>
       </div>
    )
}