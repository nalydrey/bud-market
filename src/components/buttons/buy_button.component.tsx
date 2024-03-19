import { MouseEvent } from "react"
import { BasketIcon } from "../icons/BasketIcon"
import { CheckBadgeIcon } from "@heroicons/react/24/outline"
import { CircularProgress } from "@mui/material"

interface OutlinedSvgButtonPrps {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    className?: string
    active?: boolean 
    loading?: boolean
}

export const BuyButton = ({
    active = false,
    loading = false,
    onClick,
    className
}: OutlinedSvgButtonPrps) => {
    return(
        <button 
            className={`group p-3 rounded-tl-md rounded-br-md duration-200 hover:bg-orange-primary border border-orange-primary ${className}`}
            onClick={onClick}
        >
            {
            loading ?
            <CircularProgress/>
            :
            active ?
            <CheckBadgeIcon className="w-8 stroke-orange-primary group-hover:stroke-white"/>
            :
            <BasketIcon className="w-8 stroke-orange-primary group-hover:stroke-white"/>
            }
        </button>  
    )
    
}