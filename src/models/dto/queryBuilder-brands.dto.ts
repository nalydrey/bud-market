interface BrandQueryBuilder {
    filter?: {
        products?: {
            category?: {
                systemName?: string
            }
        }  
    }
}