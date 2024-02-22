import { queryString } from "object-query-string";
import { BrandsResponce } from "../models/response/brands-responce.model";
import { mainApi } from "./createApi";
import { BrandModel } from "../models/entities/brand.model";
import { BrandResponce } from "../models/response/brand-responce.model";

export const brandApiSlice = mainApi.injectEndpoints({
    endpoints: builder => ({

        getBrands: builder.query<BrandModel[], BrandQueryBuilder>({
            providesTags: ['Brands'],
            query: (query) => {
              const qs = queryString(query)
              return `brands?${qs}`
            },
            transformResponse: (responce: BrandsResponce) => responce.brands
        }),

        deleteBrand: builder.mutation<BrandModel, number>({
            invalidatesTags: ['Brands'],
            query: (id) => ({
              url: `brands/${id}`,
              method: 'DELETE'
            }),
            transformResponse: (responce: BrandResponce) => responce.brand
          }),
    
          createBrand: builder.mutation<BrandModel, FormData>({
            invalidatesTags: ['Brands'],
            query: (body) => ({
              url: 'brands',
              method: 'POST',
              body
            }),
            transformResponse: (responce: BrandResponce) => responce.brand
          }),
    
          editBrand: builder.mutation<BrandModel, {id: number, body: FormData}>({
            invalidatesTags: ['Brands'],
            query: ({id, body}) => ({
              url: `brands/${id}`,
              method: 'PUT',
              body
            }),
            transformResponse: (responce: BrandResponce) => responce.brand
          }),
    
    }) 
})

export const {
    useGetBrandsQuery,
    useEditBrandMutation,
    useCreateBrandMutation,
    useDeleteBrandMutation
 } = brandApiSlice