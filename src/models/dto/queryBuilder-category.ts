import { CategoryModel } from "../entities/category.model"

export interface CategoryQueryBuilderDto {
    limit?: number
    page: number
    filter?: CategoryModel
}