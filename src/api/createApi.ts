import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BrandsResponce } from '../models/response/brands-responce.model'
import { BrandResponce } from '../models/response/brand-responce.model'

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/' }),
    tagTypes: ['Brands'],
    endpoints: (builder) => ({

      getBrands: builder.query<BrandsResponce, undefined>({
        providesTags: ['Brands'],
        query: () => `brands/`,
      }),

      deleteBrand: builder.mutation<BrandResponce, number>({
        invalidatesTags: ['Brands'],
        query: (id) => ({
          url: `brands/${id}`,
          method: 'DELETE'
        })
      }),

      createBrand: builder.mutation<BrandResponce, FormData>({
        invalidatesTags: ['Brands'],
        query: (body) => ({
          url: 'brands',
          method: 'POST',
          body
        })
      }),

      editBrand: builder.mutation<BrandResponce, {id: number, body: FormData}>({
        invalidatesTags: ['Brands'],
        query: ({id, body}) => ({
          url: `brands/${id}`,
          method: 'PUT',
          body
        })
      })

    }),
  })

  export const {
    useGetBrandsQuery,
    useDeleteBrandMutation,
    useCreateBrandMutation,
    useEditBrandMutation
  } = myApi

