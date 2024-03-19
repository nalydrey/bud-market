import { OrderItem } from "./order-item.model"

export type OrderStatus = 'new'| 'completed'| 'inProgress'| 'refused'| 'waited'

export interface OrderModel {
    id: number
    firstName: string
    lastName: string
    phone: string
    email: string
    goods: OrderItem[]
    createdDate: Date
    updatedDate: Date
    completeDate: Date | null
    status: OrderStatus
}