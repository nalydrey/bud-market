import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

export const Input = () => {
    return(
            <label  className="rounded-md px-5 py-4 bg-white text-black flex gap-4">
                <span>
                    <MagnifyingGlassIcon className="w-8 fill-gray-medium"/>
                </span>
                <input 
                        type="text"
                        placeholder="Пошук в каталозі"
                />
            </label>
    )
}