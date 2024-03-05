import { ProductModel } from "./product.model"


export interface ReviewModel {
    id: number
    userName: string
    text: string
    value: number | null
    product: ProductModel
    createdDate: Date
    updatedDate: Date
}