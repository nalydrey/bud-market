import { queryString } from "object-query-string";
import { CreateProductDto } from "../models/dto/create-product.dto";
import { ProductQueryBuilderDto } from "../models/dto/queryBuilder-product.dto";
import { ProductResponce } from "../models/response/product-responce.model";
import { ProductsResponce } from "../models/response/products-responce.model";
import { mainApi } from "./createApi";
import { ProductModel } from "../models/entities/product.model";


export const productApiSlice = mainApi.injectEndpoints({
    endpoints: builder => ({

        createProduct: builder.mutation<ProductModel[], CreateProductDto>({
            invalidatesTags: ['Products'],
            query: (body) => ({
               url: '/products',
               method: 'POST',
               body
            }),
            transformResponse: (responce: ProductsResponce) => responce.products
        }),
    
        deleteProduct: builder.mutation<ProductModel, number>({
            invalidatesTags: ['Products'],
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (responce: ProductResponce) => responce.product
        }),
    
        getProducts: builder.query<ProductModel[], ProductQueryBuilderDto>({
            providesTags: ['Products'],
            query: (query) => {
                const qs = queryString(query)
                return `/products?${qs}`
            },
            transformResponse: (responce: ProductsResponce) => responce.products
        }),

    })
})

export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
} = productApiSlice