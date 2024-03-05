import { MouseEvent } from "react"
import defaultImg from '../../assets/images/Rectangle 20.png'
import { XMarkIcon } from "@heroicons/react/24/outline"
import { OutlinedSvgButton } from "../buttons/OutlinedSvgButton.component"

interface CompareProductCardProps {
    title: string
    src?: string
    price?: number
    union?: string
    onClickClose?: (e: MouseEvent<HTMLButtonElement>) => void
    onClickBasket?: (e: MouseEvent<HTMLButtonElement>) => void
}


export const CompareProductCard = ({
    title,
    price,
    src,
    union = '₴',
    onClickBasket,
    onClickClose
}: CompareProductCardProps) => {
    return (
        <div className="relative bg-gray-medium p-2 text-white max-w-[200px] rounded-md h-[250px] flex flex-col gap-3">
            <button 
                className="absolute top-1 right-1 rounded-md hover:bg-gray-secondary hover:text-black duration-200"
                onClick={onClickClose}
            >
                <XMarkIcon className='w-7'/>
            </button>
            <div className=" w-28 h-28 self-center">
                <img className="  object-contain w-full h-full" src={src || defaultImg} alt="" />
            </div>
            <h3 className="grow">{title}</h3>
            <span>{price} {union}</span>
            {/* <button className="border p-1 absolute bottom-0 right-0">buy</button> */}
            <OutlinedSvgButton
                className="absolute right-0 bottom-0"
            />
        </div>
    )
}