import { CreateOrderItemDto } from "./create-order-item.dto"

export interface CreateOrderDto {
    firstName: string
    lastName: string
    phone: string
    email: string
    goods: CreateOrderItemDto[]
}