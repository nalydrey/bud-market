import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ProductCard } from "./Card.component"
import { RoundIconButton } from "./RoundIconButton.component"
import { IProduct } from "../models/product.model"
import { MouseEvent } from "react"

interface CategoryPreviewProps {
    products: IProduct[]
    title: string
    onLeft?: (e: MouseEvent<HTMLButtonElement>) => void
    onRight?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const CategoryPreview = ({
    title,
    products = [],
    onLeft,
    onRight
}: CategoryPreviewProps) => {
    return (
        <div className="">
            <header className="flex gap-12 items-center mb-5">
                <h3 className="text-3xl">{title}</h3>
                <div className="flex gap-2">
                    <RoundIconButton
                        icon={<ChevronLeftIcon className="w-6 h-6"/>}
                        onClick={onLeft}
                    />
                    <RoundIconButton
                        icon={<ChevronRightIcon className="w-6 h-6"/>}
                        onClick={onRight}
                    />
                </div>
            </header>
            <div className="flex gap-5">
                {
                    products.map(product => (
                        <ProductCard
                            key = {product.id}
                            title={product.title}
                            price={product.price[0]}
                            oldPrice={product.price[1]}
                            src={product.images[0]}
                            label={{title: product.label, color: 'blue'}}
                            status={{title: product.status, color: 'green'}}
                        />
                    ))
                }
                
            </div>
        </div>
    )
}