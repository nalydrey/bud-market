import { BasketItemModel } from "../entities/basketItem.model"

export interface OrderFormModel {
    firstName: string
    lastName: string
    phone: string
    email: string
    goods: BasketItemModel[]
}