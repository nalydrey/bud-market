import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store';




export const mainApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3030/api/',
      prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).userReducer.token
        if(token){
          headers.set('authorization', `Bearer ${token}`);
        }
      }
      }),
    tagTypes: ['Brands', 'Labels', 'Categories', 'Products', 'Users', 'User', 'Characteristics', 'Orders', 'Basket'],
    endpoints: () => ({
      
    }),
  })


