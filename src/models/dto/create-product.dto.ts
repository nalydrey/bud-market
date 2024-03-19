import { CreateCharacteristicDto } from "./create-characteristic.dto"

export interface CreateProductDto {
    title: string
    name: string
    model: string
    discription: string
    status: string
    categoryId: number | null
    labelId: number | null
    brandId: number | null
    price: number
    images: number[]
    characteristics: CreateCharacteristicDto[]
}