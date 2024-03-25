import { useState } from "react"
import { useChangeCompareMutation, useChangeFavoritesMutation } from "../api/userApi"
import { ProductModel } from "../models/entities/product.model"
import { useInfo } from "./useInfo"
import { useNavigate } from "react-router-dom"



export const useProduct = () => {

    const navigate = useNavigate()

    const [activeProductId, setActiveProductId] = useState<number | null>(null)

    const [changeCompare, {isLoading: isLoadingCompare}] = useChangeCompareMutation()
    const [changeFavorite, {isLoading: isLoadingFavorite, isSuccess: isSuccessFavorite, error: errorFavorite}] = useChangeFavoritesMutation()

    useInfo([   
        {
            isSuccess: isSuccessFavorite,
            successMessage: 'Статус змінено',
            error: errorFavorite
        }
    ])


    const changeCompareStatus = (product: ProductModel) => {
        changeCompare({productId: product.id})
        setActiveProductId(product.id)
    }
    
    const changeFavoriteStatus = (product: ProductModel) => {
        changeFavorite({productId: product.id})
        setActiveProductId(product.id)
    }

    const goToProductDetail = (product: ProductModel) => {
        navigate(`/product/${product.id}`)
    }

    const isLoading: boolean = isLoadingCompare || isLoadingFavorite

    return {
        activeProductId,
        isLoading,
        changeCompareStatus,
        changeFavoriteStatus,
        setActiveProductId,
        goToProductDetail
    }
}