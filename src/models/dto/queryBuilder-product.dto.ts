import { CategoryModel } from "../entities/category.model"
import { PhotoModel } from "../entities/photo.model"

export interface ProductQueryBuilderDto {
    limit?: number
    page: number
    filter?: {
        category?: {
            id?: number,
            systemName?: string,
            name?: string,
            photo?: null | PhotoModel
            children?: CategoryModel[]
        },
        brand?: {
            id?: number[]
        }
        price?: [number, number]
    }
    
}