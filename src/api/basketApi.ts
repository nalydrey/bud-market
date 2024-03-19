import { CreateOrderItemDto } from "../models/dto/create-order-item.dto";
import { BasketItemModel } from "../models/entities/basketItem.model";
import { BasketItemsResponce } from "../models/response/basketItems-responce.model";
import { BasketItemResponce } from "../models/response/orderItem-responce.model";
import { mainApi } from "./createApi";

const basketSliceApi = mainApi.injectEndpoints({
    endpoints: builder => ({

        addBasketItem: builder.mutation<BasketItemModel, CreateOrderItemDto>({
            invalidatesTags: ['Basket', 'User'],
            query: (body) => ({
                url: '/basket',
                method: 'POST',
                body
            }), 
            transformResponse: (responce: BasketItemResponce) => responce.item
        }),

        increaceQty: builder.mutation<BasketItemModel, number>({
            invalidatesTags: ['Basket'],
            query: (id) => ({
                url: `/basket/incr/${id}`,
                method: 'PUT',
            }), 
            transformResponse: (responce: BasketItemResponce) => responce.item
        }),

        decreaceQty: builder.mutation<BasketItemModel, number>({
            invalidatesTags: ['Basket'],
            query: (id) => ({
                url: `/basket/decr/${id}`,
                method: 'PUT',
            }), 
            transformResponse: (responce: BasketItemResponce) => responce.item
        }),
     
        deleteItem: builder.mutation<BasketItemModel, number>({
            invalidatesTags: ['Basket', 'User'],
            query: (id) => ({
                url: `/basket/${id}`,
                method: 'DELETE',
            }), 
            transformResponse: (responce: BasketItemResponce) => responce.item
        }),

        getMyBasket: builder.query<BasketItemModel[], undefined>({
          providesTags: ['Basket'],  
          query: () => '/basket/user',
          transformResponse: (responce: BasketItemsResponce) => responce.items
        })
    })
})


export const { 
    useAddBasketItemMutation,
    useDecreaceQtyMutation,
    useDeleteItemMutation,
    useIncreaceQtyMutation,
    useGetMyBasketQuery
 } = basketSliceApi