import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasketItemModel } from "../../models/entities/basketItem.model";

interface BasketState {
    items: BasketItemModel[]
    totalPrice: number
    itemQty: number
}

const initialState: BasketState = {
    items: [],
    totalPrice: 0,
    itemQty: 0
}


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setItems: {
            reducer: (state, action: PayloadAction<BasketItemModel[], string, {itemQty: number, totalPrice: number}>) => {
                state.items = action.payload
                state.itemQty = action.meta.itemQty
                state.totalPrice = action.meta.totalPrice
            },
            prepare: (payload: BasketItemModel[]) => {
                const itemQty = payload.length
                const totalPrice = payload.map(item => item.product.priceHistory[0].value*item.qty).reduce((summ, elem) => (summ + elem), 0)
                return {
                    payload,
                    meta: {
                        itemQty,
                        totalPrice
                    }
                }
            },
        },
        initBasket: () => initialState
    }
})

export const { setItems, initBasket } = basketSlice.actions

export default basketSlice.reducer