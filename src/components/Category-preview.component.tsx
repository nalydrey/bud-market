import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ProductCard } from "./cards/Card.component"
import { RoundIconButton } from "./buttons/RoundIconButton.component"
import { CategoryModel } from "../models/entities/category.model"
import { useState } from "react"
import { ProductQueryBuilderDto } from "../models/dto/queryBuilder-product.dto"
import { useGetProductsQuery } from "../api/productApi"
import { ProductModel } from "../models/entities/product.model"
import { useNavigate } from "react-router-dom"
import { useChangeCompareMutation, useChangeFavoritesMutation } from "../api/userApi"
import { useUser } from "../hooks/useUser"

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
    const [changeFavorite, {isLoading}] = useChangeFavoritesMutation()
    const [changeCompare] = useChangeCompareMutation()

    const {user} = useUser()

    console.log(query);

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
    }
   

    const handleClickFavorite = (product: ProductModel) => {
        user &&
        changeFavorite({productId: product.id, userId: user.id})
        setCurrentId(product.id)
    }

    const handleClickCompare = (product: ProductModel) => {
        console.log(product, user);
        
        user && 
        changeCompare({productId: product.id, userId: user.id})
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
                    products.map(product => {
                        const images = product.images.map(img => img.fileName)
                        return (
                        <ProductCard
                            key = {product.id}
                            title={product.title}
                            price={product.priceHistory[0].value}
                            isLoading = {isLoading && currentId === product.id}
                            isFavorite={user && user.favorite.some(item => item.id === product.id)}
                            oldPrice={product.priceHistory[1] && product.priceHistory[1].value}
                            src={images}
                            label={product.label && {title: product.label.name, color: product.label.color}}
                            status={{title: product.status, color: 'green'}}
                            onClickCard={() => handleClickCard(product)}
                            onFavorite={() => handleClickFavorite(product)}
                            onCompare={() => handleClickCompare(product)}
                        />
                    )})
                }
                
            </div>
        </div>
    )
}