import { BasketIcon } from "../icons/BasketIcon"

interface OutlinedSvgButtonPrps {
    className?: string
}

export const OutlinedSvgButton = ({
    className
}: OutlinedSvgButtonPrps) => {
    return(
        <button className={`p-3 rounded-tl-md rounded-br-md duration-200 hover:bg-orange-primary border border-orange-primary ${className}`}>
            <BasketIcon className="w-8  stroke-orange-primary"/>
        </button>  
    )
    
}