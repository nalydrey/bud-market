import { ProductModel } from "./product.model"

export interface OrderItem {
    id: number
    product: ProductModel
    qty: number
}