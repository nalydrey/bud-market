import { ProductModel } from "./product.model"

export interface BasketItemModel {
    id?: number
    product: ProductModel
    qty: number
}