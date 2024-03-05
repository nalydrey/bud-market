import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'




export const mainApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/' }),
    tagTypes: ['Brands', 'Labels', 'Categories', 'Products', 'Users', 'Characteristics'],
    endpoints: () => ({
      
    }),
  })



