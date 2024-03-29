import { MouseEvent } from "react"
import { Counter } from "../Counter.component"

interface UserButtonProps {
    icon: JSX.Element
    countValue?: number
    onClick?: (event: MouseEvent<HTMLButtonElement>)=>void
}

export const UserButton = ({
    icon,
    countValue,
    onClick
}: UserButtonProps) => {

    return (
        <button 
            className="group bg-gray-medium p-5 duration-200 hover:bg-orange-secondary"
            onClick={onClick}
        >
            <div className="relative">
                <div className="w-8">
                    {icon}
                </div>
                {!!countValue &&
                    <Counter 
                        value={countValue}
                        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 duration-200 group-hover:bg-gray-medium"
                    />
                }
            </div>
        </button>
    )
}