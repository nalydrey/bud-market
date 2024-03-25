import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ProductCard } from "../cards/product_card.component"
import { RoundIconButton } from "../buttons/RoundIconButton.component"
import { CategoryModel } from "../../models/entities/category.model"
import { useState } from "react"
import { ProductQueryBuilderDto } from "../../models/dto/queryBuilder-product.dto"
import { useGetProductsQuery } from "../../api/productApi"
import { ProductModel } from "../../models/entities/product.model"
import { useUser } from "../../hooks/useUser"
import { useBasket } from "../../hooks/useBasket"
import { useProduct } from "../../hooks/useProduct"
import { ProductCardPreloader } from "../preloaders/product-card-preloader"

interface CategoryPreviewProps {
    category: CategoryModel
}

export const CategoryPreview = ({
    category,
}: CategoryPreviewProps) => {

    const [query, setQuery] = useState<ProductQueryBuilderDto>({limit: 2, page: 0, filter: {category: {id: category.id}}})

    const {data, isSuccess, isLoading: isLoadingProduct, isFetching} = useGetProductsQuery(query)


    const {user} = useUser()

    const {
        items,
        isLoading: isLoadingBasket, 
        addToBasket 
    }
    = useBasket()
    
    const { 
        isLoading, 
        activeProductId, 
        setActiveProductId, 
        changeCompareStatus, 
        changeFavoriteStatus,
        goToProductDetail
    } 
    = useProduct()

    
    const isFirst = query.page === 0
    let isLast = false
    if(data && query.limit){
        isLast = Math.round(data.qty/query.limit) === query.page + 1
    }


    

    const handleClickLeft = () => {
        const newPage = query.page - 1
        if(newPage >=0)
        setQuery({...query, page: newPage })
    }
    
    const handleClickRight = () => {
        const newPage = query.page + 1
        setQuery({...query, page: newPage })
    }

    const handleClickCard = (product: ProductModel) => {
        goToProductDetail(product)
    }

    const handleClickFavorite = (product: ProductModel) => {
        changeFavoriteStatus(product)
    }

    const handleClickCompare = (product: ProductModel) => {
        changeCompareStatus(product)
    }

    const handleClickBasket = (product: ProductModel) => {
        addToBasket(product)
        setActiveProductId(product.id)
    }


    return (
        <div className="">
            <header className="flex gap-12 items-center mb-5">
                <h3 className="text-3xl">{category.name}</h3>
                <div className="flex gap-2">
                    <RoundIconButton
                        disabled = {isFirst}
                        icon={<ChevronLeftIcon className="w-6 h-6"/>}
                        onClick={handleClickLeft}
                    />
                    <RoundIconButton
                        disabled = {isLast}
                        icon={<ChevronRightIcon className="w-6 h-6"/>}
                        onClick={handleClickRight}
                    />
                </div>
            </header>
            <div className="flex gap-5">
                {   
                    isLoadingProduct ?
                    <>
                        <ProductCardPreloader/> 
                        <ProductCardPreloader/> 
                    </>
                    :
                    isSuccess &&
                    data.products.map(product => (
                        <ProductCard
                            key = {product.id}
                            product={product}
                            isLoading = {isFetching || (isLoading || isLoadingBasket) && activeProductId === product.id}
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