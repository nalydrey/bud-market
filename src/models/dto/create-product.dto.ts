import { CreateCharacteristicDto } from "./create-characteristic.dto"

export interface CreateProductDto {
    title: string
    name: string
    model: string
    discription: string
    status: string
    categoryId: number
    labelId: number
    brandId: number
    price: number
    images: number[]
    characteristics: CreateCharacteristicDto[]
}