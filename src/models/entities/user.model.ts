import { OrderModel } from "./order.model"
import { ProductModel } from "./product.model"

export interface UserModel {
    id: number
    firstName: string
    lastName: string
    role: string
    email: string
    phone: string
    password: string
    favorite: ProductModel[]
    compare: ProductModel[]
    orders: OrderModel
    createdDate: Date
    updatedDate: Date
}