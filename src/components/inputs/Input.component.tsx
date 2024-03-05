import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { ChangeEvent } from "react"

interface InputProps {
    value: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    value,
    onChange
}: InputProps) => {


    return(
            <label  className="rounded-md px-5 py-4 bg-white text-black flex gap-4">
                <span>
                    <MagnifyingGlassIcon className="w-8 fill-gray-medium"/>
                </span>
                <input 
                    value={value}
                    type="text"
                    placeholder="Пошук в каталозі"
                    onChange={onChange}
                />
            </label>
    )
}