
export interface ProductQueryBuilderDto {
    limit?: number
    page: number
    filter?: {
        category?: {
            id?: number
        }
    }
}