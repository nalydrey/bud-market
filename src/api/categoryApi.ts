import { queryString } from "object-query-string";
import { EditCategoryDto } from "../models/dto/edit-category.dto";
import { CategoryQueryBuilderDto } from "../models/dto/queryBuilder-category";
import { CategoriesResponce } from "../models/response/categories-responce";
import { CategoryResponce } from "../models/response/category-responce.model";
import { mainApi } from "./createApi";
import { CategoryModel } from "../models/entities/category.model";


export const categoryApiSlice = mainApi.injectEndpoints({
    endpoints: builder => ({

        getTreeCategories: builder.query<CategoryModel[], undefined>({
          providesTags: ['Categories'],
          query: () => `/categories/tree`,
          transformResponse: (responce: CategoriesResponce) => responce.categories
        }),
        
          getDescendantsCategories: builder.query<CategoryModel, string>({
            providesTags: ['Categories'],
            query: (systemName) => `/categories/tree/${systemName}`,
            transformResponse: (responce: CategoryResponce) => responce.category
          }),
         
          getAncestorsCategories: builder.query<CategoryModel[], string>({
            providesTags: ['Categories'],
            query: (systemName) => `/categories/array/${systemName}`,
            transformResponse: (responce: CategoriesResponce) => responce.categories
          }),
    
    
          
          getCategories: builder.query<CategoryModel[], CategoryQueryBuilderDto>({
            providesTags: ['Categories'],
            query: (query) => {
              const qs = queryString(query)
              return `/categories/many?${qs}`
            },
            transformResponse: (responce: CategoriesResponce) => responce.categories 
          }),
         
    
          createCategory: builder.mutation<CategoryModel, FormData>({
            invalidatesTags: ['Categories'],
            query: (body) => ({
              url: '/categories',
              method: 'POST',
              body
            }),
            transformResponse: (responce: CategoryResponce) => responce.category
          }),
    
          deleteCategory: builder.mutation<CategoryModel, number>({
            invalidatesTags: ['Categories'],
            query: (id) => ({
              url: `categories/${id}`,
              method: 'DELETE'
            }),
            transformResponse: (responce: CategoryResponce) => responce.category
          }), 
    
          updateCategory: builder.mutation<CategoryModel, EditCategoryDto>({
            invalidatesTags: ['Categories'],
            query: ({id, name, parentId}) => {
              const body = {name, parentId}
              return {
                url: `categories/${id}`,
                method: 'PUT',
                body
              }
            },
            transformResponse: (responce: CategoryResponce) => responce.category
          }),
    })
})

export const { 
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetTreeCategoriesQuery,
  useGetAncestorsCategoriesQuery,
  useGetDescendantsCategoriesQuery,
  useUpdateCategoryMutation
} = categoryApiSlice