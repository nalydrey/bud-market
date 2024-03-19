import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ProductCard } from "../cards/product_card.component"
import { RoundIconButton } from "../buttons/RoundIconButton.component"
import { CategoryModel } from "../../models/entities/category.model"
import { useState } from "react"
import { ProductQueryBuilderDto } from "../../models/dto/queryBuilder-product.dto"
import { useGetProductsQuery } from "../../api/productApi"
import { ProductModel } from "../../models/entities/product.model"
import { useNavigate } from "react-router-dom"
import { useChangeCompareMutation, useChangeFavoritesMutation } from "../../api/userApi"
import { useUser } from "../../hooks/useUser"
import { useBasket } from "../../hooks/useBasket"
import { useInfo } from "../../hooks/useInfo"

interface CategoryPreviewProps {
    category: CategoryModel
}

export const CategoryPreview = ({
    category,
}: CategoryPreviewProps) => {

    const navigate = useNavigate()

    const [currentId, setCurrentId] = useState<number | null>(null)
    const [query, setQuery] = useState<ProductQueryBuilderDto>({limit: 2, page: 0, filter: {category: {id: category.id}}})

    const {data: products, isSuccess} = useGetProductsQuery(query)
    const [changeFavorite, {isLoading, isSuccess: isSuccessFavorite, error: errorFavorite}] = useChangeFavoritesMutation()
    const [changeCompare, {isLoading: isLoadingCompare}] = useChangeCompareMutation()

    const {user} = useUser()
    const {addToBasket, isLoading: isLoadingBasket, items} = useBasket()

    useInfo([
        {
            isSuccess: isSuccessFavorite,
            successMessage: 'Статус змінено',
            error: errorFavorite
        }
    ])

    

    const handleClickLeft = () => {
        const newPage = query.page - 1
        setQuery({...query, page: newPage })
    }
    
    const handleClickRight = () => {
        const newPage = query.page + 1
        setQuery({...query, page: newPage })
    }

    const handleClickCard = (product: ProductModel) => {
        navigate(`/product/${product.id}`)
        setCurrentId(product.id)
    }
   

    const handleClickFavorite = (product: ProductModel) => {
        user && changeFavorite({productId: product.id, userId: user.id})
        setCurrentId(product.id)
    }

    const handleClickCompare = (product: ProductModel) => {
        user && 
        changeCompare({productId: product.id, userId: user.id})
        setCurrentId(product.id)
    }

    const handleClickBasket = (product: ProductModel) => {
        addToBasket(product)
        setCurrentId(product.id)
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
                    products.map(product => (
                        <ProductCard
                            key = {product.id}
                            product={product}
                            isLoading = {(isLoading || isLoadingBasket || isLoadingCompare) && currentId === product.id}
                            isInBasket = {items.some(item => item.product.id === product.id)}
                            isFavorite={!!user && user.favorite.some(item => item.id === product.id)}
                            isCompared={!!user && user.compare.some(item => item.id === product.id)}
                            onClickCard={handleClickCard}
                            onFavorite={handleClickFavorite}
                            onCompare={handleClickCompare}
                            onBasket={handleClickBasket}

                        />
                    ))
                }
                
            </div>
        </div>
    )
}