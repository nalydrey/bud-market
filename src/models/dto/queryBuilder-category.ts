
export interface CategoryQueryBuilderDto {
    limit?: number
    page: number
    filter?: {
        productIds?: number[]
        systemName?: string
    }
}