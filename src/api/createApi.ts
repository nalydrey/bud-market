import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BrandsResponce } from '../models/response/brands-responce.model'
import { BrandResponce } from '../models/response/brand-responce.model'
import { LabelResponce } from '../models/response/label-responce.model'
import { CreateLabelDto } from '../models/dto/create-label.dto'
import { LabelsResponce } from '../models/response/labels-responce.model'
import { EditLabelDto } from '../models/dto/edit-label.dto'
import { CategoriesResponce } from '../models/response/categories-responce'
import { CategoryResponce } from '../models/response/category-responce.model'
import { EditCategoryDto } from '../models/dto/edit-category.dto'
import { ProductResponce } from '../models/response/product-responce.model'
import { CreateProductDto } from '../models/dto/create-product.dto'
import { ProductsResponce } from '../models/response/products-responce.model'
import { ProductQueryBuilderDto } from '../models/dto/queryBuilder-product.dto'
import { queryString } from 'object-query-string'
import { CategoryQueryBuilderDto } from '../models/dto/queryBuilder-category'


export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/' }),
    tagTypes: ['Brands', 'Labels', 'Categories', 'Products'],
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
        }),
      }),

      editBrand: builder.mutation<BrandResponce, {id: number, body: FormData}>({
        invalidatesTags: ['Brands'],
        query: ({id, body}) => ({
          url: `brands/${id}`,
          method: 'PUT',
          body
        })
      }),


      createLabel: builder.mutation<LabelResponce, CreateLabelDto>({
        invalidatesTags: ['Labels'],
        query: (body) => ({
          url: 'labels',
          method: 'POST',
          body
        })
      }),

      deleteLabel: builder.mutation<LabelsResponce, number>({
        invalidatesTags: ['Labels'],
        query: (id) => ({
          url: `labels/${id}`,
          method: 'DELETE'
        })
      }),

      editLabel: builder.mutation<LabelResponce, EditLabelDto>({
        invalidatesTags: ['Labels'],
        query: ({id, color, name}) => {
          const body = { color, name }
          return { 
            url: `labels/${id}`,
            method: 'PUT',
            body 
          } 
        }
      }),

      getLabels: builder.query<LabelsResponce, undefined>({
        providesTags: ['Labels'],
        query: () => 'labels'
      }),


      getTreeCategories: builder.query<CategoriesResponce, undefined>({
        providesTags: ['Categories'],
        query: () => `/categories/tree`
      }),
     
      getDescendantsCategories: builder.query<CategoryResponce, string>({
        providesTags: ['Categories'],
        query: (systemName) => `/categories/tree/${systemName}`
      }),
     
      getAncestorsCategories: builder.query<CategoriesResponce, string>({
        providesTags: ['Categories'],
        query: (systemName) => `/categories/array/${systemName}`
      }),


      
      getCategories: builder.query<CategoriesResponce, CategoryQueryBuilderDto>({
        providesTags: ['Categories'],
        query: (query) => {
          const qs = queryString(query)
          return `/categories/many?${qs}`
        } 
      }),
     

      createCategory: builder.mutation<CategoryResponce, FormData>({
        invalidatesTags: ['Categories'],
        query: (body) => ({
          url: '/categories',
          method: 'POST',
          body
        })
      }),

      deleteCategory: builder.mutation<CategoryResponce, number>({
        invalidatesTags: ['Categories'],
        query: (id) => ({
          url: `categories/${id}`,
          method: 'DELETE'
        })
      }), 

      updateCategory: builder.mutation<CategoryResponce, EditCategoryDto>({
        invalidatesTags: ['Categories'],
        query: ({id, name, parentId}) => {
          const body = {name, parentId}
          return {
            url: `categories/${id}`,
            method: 'PUT',
            body
          }
        }
      }),


      createProduct: builder.mutation<ProductResponce, CreateProductDto>({
        invalidatesTags: ['Products'],
        query: (body) => ({
           url: '/products',
           method: 'POST',
           body
        })
      }),

      deleteProduct: builder.mutation<ProductResponce, number>({
        invalidatesTags: ['Products'],
        query: (id) => ({
          url: `/products/${id}`,
          method: 'DELETE'
        })
      }),

      getProducts: builder.query<ProductsResponce, ProductQueryBuilderDto>({
        providesTags: ['Products'],
        query: (query) => {
          const qs = queryString(query)
          return `/products?${qs}`
        }
      }),

    }),
  })

  export const {
    useGetBrandsQuery,
    useDeleteBrandMutation,
    useCreateBrandMutation,
    useEditBrandMutation,
    useCreateLabelMutation,
    useEditLabelMutation,
    useDeleteLabelMutation,
    useGetLabelsQuery,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useCreateProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetTreeCategoriesQuery,
    useGetDescendantsCategoriesQuery,
    useGetAncestorsCategoriesQuery
  } = myApi

