import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ProductCard } from "./Card.component"
import { RoundIconButton } from "./RoundIconButton.component"
import { CategoryModel } from "../models/entities/category.model"
import { useGetProductsQuery } from "../api/createApi"
import { useState } from "react"
import { ProductQueryBuilderDto } from "../models/dto/queryBuilder-product.dto"

interface CategoryPreviewProps {
    category: CategoryModel

}

export const CategoryPreview = ({
    category
}: CategoryPreviewProps) => {

    const [query, setQuery] = useState<ProductQueryBuilderDto>({limit: 2, page: 0, filter: {category: {id: category.id}}})

    const {data, isSuccess} = useGetProductsQuery(query)

    console.log(query);

    const handleClickLeft = () => {
        const newPage = query.page - 1
        setQuery({...query, page: newPage })
    }
    
    const handleClickRight = () => {
        const newPage = query.page + 1
        setQuery({...query, page: newPage })
    }
    
    return (
        <div className="">
            <header className="flex gap-12 items-center mb-5">
                <h3 className="text-3xl">{category.name}</h3>
                <div className="flex gap-2">
                    <RoundIconButton
                        icon={<ChevronLeftIcon className="w-6 h-6"/>}
                        onClick={handleClickLeft}
                    />
                    <RoundIconButton
                        icon={<ChevronRightIcon className="w-6 h-6"/>}
                        onClick={handleClickRight}
                    />
                </div>
            </header>
            <div className="flex gap-5">
                {
                    isSuccess &&
                    data.products.map(product => {
                        const images = product.images.map(img => 'http://localhost:3030/' + img.fileName)
                        return (
                        <ProductCard
                            key = {product.id}
                            title={product.title}
                            price={product.priceHistory[0].value}
                            oldPrice={product.priceHistory[1] && product.priceHistory[1].value}
                            src={images}
                            label={product.label && {title: product.label.name, color: product.label.color}}
                            status={{title: product.status, color: 'green'}}
                        />
                    )})
                }
                
            </div>
        </div>
    )
}