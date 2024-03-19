import { MouseEvent } from "react"
import img from '../assets/images/Rectangle 20.png'

interface CategoryCardProps {
    title: string
    imgSrc: string | null
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const CategoryCard = ({
    title,
    imgSrc,
}: CategoryCardProps) => {
    return (
        <div className="bg-gray-primary flex flex-col items-center rounded-md">
            <div className="p-5 grow">
                <img src={imgSrc || img} alt="" />
            </div>
            <button className="bg-gray-dark w-full text-white p-4 rounded-b-md text-lg hover:bg-orange-primary">{title}</button>
        </div>
    )
}