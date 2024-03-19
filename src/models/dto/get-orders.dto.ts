import { OrderStatus } from "../entities/order.model"

export interface GetOrdersDto {
    email?: string
    phone?: string
    status?: OrderStatus
}