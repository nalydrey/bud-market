import { CategoryModel } from "../entities/category.model"
import { PhotoModel } from "../entities/photo.model"
import { QueryBuilderCharacteristic } from "./queryBuilder-characteristic.model"

export interface ProductQueryBuilderDto {
    limit?: number
    page: number
    filter?: {
        like?: string 
        category?: {
            id?: number,
            systemName?: string,
            name?: string,
            photo?: null | PhotoModel
            children?: CategoryModel[]
        },
        brand?: {
            id?: number[]
        },
        compareForUsers?: {
            id: number
        } 
        price?: [number, number]
        characteristics?: QueryBuilderCharacteristic[]
    }
    
}