import { ProductModel } from "./product.model"

export interface BasketItemModel {
    product: ProductModel
    qty: number
}