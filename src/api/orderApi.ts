import { CreateOrderDto } from "../models/dto/create-order.model";
import { OrderModel } from "../models/entities/order.model";
import { OrderResponce } from "../models/response/order-responce.model";
import { OrdersResponce } from "../models/response/orders-responce.model";
import { mainApi } from "./createApi";

export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderModel, CreateOrderDto>({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body
            }),
            transformResponse: (responce: OrderResponce) => responce.order
        }),

        getOrders: builder.query<OrderModel[], undefined>({
            query: () => {
                return `/order/`
            },  
            transformResponse: (responce: OrdersResponce) => responce.orders  
        })
    }) 
})

export const {
    useCreateOrderMutation,
    useGetOrdersQuery
} = orderApi