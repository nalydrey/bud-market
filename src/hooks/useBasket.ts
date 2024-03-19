import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { setItems } from "../store/slices/basket.slice"
import { BasketItemModel } from "../models/entities/basketItem.model"
import { ProductModel } from "../models/entities/product.model"
import { useCreateOrderMutation, useCreateOrderWithUserMutation } from "../api/orderApi"
import { OrderFormModel } from "../models/forms/order-form.model"
import { CreateOrderItemDto } from "../models/dto/create-order-item.dto"
import { useInfo } from "./useInfo"
import { useUser } from "./useUser"
import { useAddBasketItemMutation, useDecreaceQtyMutation, useDeleteItemMutation, useGetMyBasketQuery, useIncreaceQtyMutation } from "../api/basketApi"
import { skipToken } from "@reduxjs/toolkit/query"




export const useBasket = () => {

    const dispatch = useAppDispatch()

    const {user} = useUser()

    const {items, totalPrice, itemQty} = useAppSelector((state) => state.basketReducer)

    const [createNewOrder, {data: orderData,isSuccess: isSuccessCreateNewOrder, isLoading: isLoadingCreateNewOrder, error: errorCreateNewOrder}] = useCreateOrderMutation()
    const [createNewOrderWithUser, {data: orderDataWithUser,isSuccess: isSuccessCreateNewOrderWithUser, isLoading: isLoadingCreateNewOrderWithUser, error: errorCreateNewOrderWithUser}] = useCreateOrderWithUserMutation()
    const {data: basketItems} = useGetMyBasketQuery(user ? undefined : skipToken)
    const [addItemToUser, {isLoading, isSuccess: isSuccessAddToButton, error: addToBasketError} ] = useAddBasketItemMutation()
    const [increaceQty, {isSuccess: increaceSuccess, error: increaceError} ] = useIncreaceQtyMutation()
    const [decreaceQty, {isSuccess: decteaceSuccess, error: decteaceError} ] = useDecreaceQtyMutation()
    const [deleteItemFromUser, {isSuccess: isSuccessDelete, error: deleteError}] = useDeleteItemMutation()


    useInfo([
        {
            isSuccess: isSuccessCreateNewOrder,
            successMessage: 'Замовлення створене',
            error: errorCreateNewOrder
        },
        {
            isSuccess: isSuccessAddToButton,
            successMessage: 'Товар доданий до кошика',
            error: addToBasketError
        },
        {
            isSuccess: isSuccessCreateNewOrderWithUser,
            successMessage: 'Замовлення створене',
            error: errorCreateNewOrderWithUser
        },
        {
            isSuccess: isSuccessDelete,
            successMessage: 'Замовлення видалене',
            error: deleteError
        },
        {
            isSuccess: increaceSuccess,
            successMessage: 'Кількість збільшено',
            error: increaceError
        },
        {
            isSuccess: decteaceSuccess,
            successMessage: 'Кількість зменшено',
            error: decteaceError
        },
    ])

    useEffect(() => {
        if(isSuccessCreateNewOrder) {
            if(!user){
                localStorage.removeItem('basket')
            }
        }
    }, [isSuccessCreateNewOrder])

    

    useEffect(() => {
        if(!user){
            const productsStr = localStorage.getItem('basket')
            if(productsStr){
                const items: BasketItemModel[] = JSON.parse(productsStr)
                dispatch(setItems(items))
            }
            else{
                dispatch(setItems([]))
            }
        }
    }, [user?.id])
   
    useEffect(() => {
        if(basketItems){
                dispatch(setItems(basketItems))
            }
    }, [basketItems])

    const addToBasket = (product: ProductModel) => {
        if(!user){
            let arr: BasketItemModel[]  = []
            const localBasket = localStorage.getItem('basket')
            if(localBasket){
                arr = JSON.parse(localBasket)
            }
            if(!arr.some(item => item.product.id === product.id)) arr.push({product, qty: 1})
            localStorage.setItem('basket', JSON.stringify(arr))
            dispatch(setItems(arr))
        }
        else{
            addItemToUser({productId: product.id, qty: 1})
        }
    }

    const changeQty = (basketItem: BasketItemModel, direction: boolean) => {
        if(!user){
            const newState: BasketItemModel[] = items.map(item => {
                if(item.product.id === basketItem.product.id){
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
        else{
            direction ?
                basketItem.id && increaceQty(basketItem.id)
            :
                basketItem.id && decreaceQty(basketItem.id)
        }
    }

    const deleteFromBasket = (basketItem: BasketItemModel) => {
        if(!user){
            const newState = items.filter(item => item.product.id !== basketItem.product.id)
            localStorage.setItem('basket', JSON.stringify(newState))
            dispatch(setItems(newState))
        }
        else{
            basketItem.id && deleteItemFromUser(basketItem.id)
        }
    }

    const createOrder = (orderData: OrderFormModel) => {
        const transformProducts: CreateOrderItemDto[] = items.map(good => ({
            productId: good.product.id,
            qty: good.qty
        }))
        user ?
            createNewOrderWithUser({...orderData, goods: transformProducts})
        :
            createNewOrder({...orderData, goods: transformProducts})
    }

    

    return {
        isLoading: isLoadingCreateNewOrder || isLoadingCreateNewOrderWithUser || isLoading,
        order: isSuccessCreateNewOrder ? orderData : isSuccessCreateNewOrderWithUser ? orderDataWithUser : undefined,
        isSuccess: isSuccessCreateNewOrder || isSuccessCreateNewOrderWithUser,
        items,
        totalPrice,
        itemQty,
        changeQty, 
        deleteFromBasket,
        addToBasket,
        createOrder
    }
}