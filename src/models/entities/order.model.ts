import { OrderItem } from "./order-item.model"

export interface OrderModel {
    id: number
    firstName: string
    lastName: string
    phone: string
    email: string
    goods: OrderItem[]
    createdDate: Date
    updatedDate: Date
}