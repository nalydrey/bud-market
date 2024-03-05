import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { setItems } from "../store/slices/basket.slice"
import { BasketItemModel } from "../models/entities/basketItem.model"
import { ProductModel } from "../models/entities/product.model"




export const useBasket = () => {


    const {items, totalPrice, itemQty} = useAppSelector((state) => state.basketReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const productsStr = localStorage.getItem('basket')
        if(productsStr){
            const items: BasketItemModel[] = JSON.parse(productsStr)
            dispatch(setItems(items))
        }
    }, [])

    const addToBasket = (product: ProductModel) => {
        const localBasket = localStorage.getItem('basket')
        let arr: BasketItemModel[]  = []
        if(localBasket){
            arr = JSON.parse(localBasket)
        }
        if(!arr.some(item => item.product.id === product.id)) arr.push({product, qty: 1})
        localStorage.setItem('basket', JSON.stringify(arr))
        dispatch(setItems(arr))
    }

    const changeQty = (product: ProductModel, direction: boolean) => {
        console.log(product, direction);
        
        const newState: BasketItemModel[] = items.map(item => {
            if(item.product.id === product.id){
                return({
                    product: item.product,
                    qty: direction ? item.qty + 1 : item.qty > 0 ? item.qty - 1 : 0
                })
            }
            return item
        })
        
        localStorage.setItem('basket', JSON.stringify(newState))
        dispatch(setItems(newState))
    }

    const deleteFromBasket = (product: ProductModel) => {
        const newState = items.filter(item => item.product.id !== product.id)
        localStorage.setItem('basket', JSON.stringify(newState))
        dispatch(setItems(newState))
    }

    return {
        items,
        totalPrice,
        itemQty,
        changeQty, 
        deleteFromBasket,
        addToBasket
    }
}