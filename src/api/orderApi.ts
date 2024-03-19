import { queryString } from "object-query-string";
import { CreateOrderDto } from "../models/dto/create-order.model";
import { GetOrdersDto } from "../models/dto/get-orders.dto";
import { OrderModel } from "../models/entities/order.model";
import { OrderResponce } from "../models/response/order-responce.model";
import { OrdersResponce } from "../models/response/orders-responce.model";
import { mainApi } from "./createApi";
import { EditOrderDto } from "../models/dto/edit-order-dto";

export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        createOrder: builder.mutation<OrderModel, CreateOrderDto>({
            invalidatesTags: ['Orders'],
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body
            }),
            transformResponse: (responce: OrderResponce) => responce.order
        }),
        
        createOrderWithUser: builder.mutation<OrderModel, CreateOrderDto>({
            invalidatesTags: ['Orders', 'Basket'],
            query: (body) => ({
                url: '/order/user',
                method: 'POST',
                body
            }),
            transformResponse: (responce: OrderResponce) => responce.order
        }),

        getOrders: builder.query<OrderModel[], GetOrdersDto>({
            providesTags: ['Orders'],
            query: (dto) => {
                const query = queryString(dto)
                return `/order/?${query}`
            },  
            transformResponse: (responce: OrdersResponce) => responce.orders  
        }),
        
        deleteOrder: builder.mutation<OrderModel[], number>({
            invalidatesTags: ['Orders'],
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE',
            }),  
            transformResponse: (responce: OrdersResponce) => responce.orders  
        }),

        editOrder: builder.mutation<OrderModel, EditOrderDto>({
            invalidatesTags: ['Orders'],
            query: (dto) => ({
                url: `/order/${dto.id}`,
                method: 'PUT',
                body: {
                    status: dto.status
                }
            }),
            transformResponse: (responce: OrderResponce) => responce.order  
        })
    }) 
})

export const {
    useCreateOrderWithUserMutation,
    useCreateOrderMutation,
    useGetOrdersQuery,
    useEditOrderMutation,
    useDeleteOrderMutation
} = orderApi