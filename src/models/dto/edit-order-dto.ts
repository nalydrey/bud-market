import { OrderStatus } from "../entities/order.model"

export interface EditOrderDto {
    id: number
    status?: OrderStatus
}