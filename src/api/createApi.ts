import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BrandsResponce } from '../models/response/brands-responce.model'
import { BrandResponce } from '../models/response/brand-responce.model'
import { LabelResponce } from '../models/response/label-responce.model'
import { CreateLabelDto } from '../models/dto/create-label.dto'
import { LabelsResponce } from '../models/response/labels-responce.model'
import { EditLabelDto } from '../models/dto/edit-label.dto'
import { CategoriesResponce } from '../models/response/categories-responce'
import { CategoryFormModel } from '../components/forms/CategoryForm.component'
import { CategoryResponce } from '../models/response/category-responce.model'
import { EditCategoryDto } from '../models/dto/edit-category.dto'

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/' }),
    tagTypes: ['Brands', 'Labels', 'Categories'],
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


      getCategories: builder.query<CategoriesResponce, undefined>({
        providesTags: ['Categories'],
        query: () => '/categories'
      }),

      createCategory: builder.mutation<CategoryResponce, CategoryFormModel>({
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
      })

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
    useUpdateCategoryMutation
  } = myApi

