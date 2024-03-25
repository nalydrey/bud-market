import { BrandModel } from "./brand.model"
import { CategoryModel } from "./category.model"
import { CharacteristicModel } from "./characteristic.model"
import { LabelModel } from "./label.model"
import { PhotoModel } from "./photo.model"
import { PriceModel } from "./price.model"

export interface ProductModel {
    id: number
    brand: BrandModel
    category:CategoryModel 
    characteristics:CharacteristicModel[]
    createdDate:Date
    discription:string
    images:PhotoModel[]
    label:LabelModel | null
    model: string
    name: string
    priceHistory:PriceModel[]
    rating:number
    status: string
    title: string
    updatedDate:Date
    viewCounter:number
}



