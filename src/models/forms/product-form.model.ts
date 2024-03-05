import { CharacteristicFormModel } from "./characteristic-form.model"

export interface ProductFormModel {
    title: string
    name: string
    model: string
    discription: string
    status: string
    categoryId: number | null
    labelId: number | null
    brandId: number | null
    price: number | undefined
    images: FileList | null
    characteristics: CharacteristicFormModel[]
}