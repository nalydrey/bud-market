import { queryString } from "object-query-string";
import { CreateUserDto } from "../models/dto/create-user.dto";
import { UserModel } from "../models/entities/user.model";
import { UsersResponce } from "../models/response/users-responce.model";
import { mainApi } from "./createApi";
import { ChangeFavoriteDto } from "../models/dto/change-favorite.dto";
import { ChangeCompareDto } from "../models/dto/change-compare.dto";
import { LoginResponce } from "../models/response/login-responce.model";
import { LoginDto } from "../models/dto/login.dto";

export const userApiSlice = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UserModel[], undefined>({
            providesTags: ['Users'],
            query: () => '/users',
            transformResponse: (responce: UsersResponce) => responce.users 
        }),

        deleteUser: builder.mutation<UserModel, number>({
            invalidatesTags: ['Users'],
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            })
        }),

        registerUser: builder.mutation<UserModel, CreateUserDto>({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body
            })
        }),
       
        loginUser: builder.mutation<string, LoginDto>({
            invalidatesTags: ['User'],
            query: (loginDto) => {
                const qs =queryString(loginDto)
                return ({
                    url: `/users/login?${qs}`,
                    method: 'GET'
                }) 
            },
            transformResponse: (responce: LoginResponce) => responce.token 
        }),

        enterByToken: builder.query<UserModel | null, string | null>({
            providesTags: ['User'],
            queryFn: async (token) => {
                if(token){
                    const response = await fetch('http://localhost:3030/api/users/enter', {
                        method: 'GET',
                        headers: {'authorization': `Bearer ${token}`}
                    });
                    const json = await response.json();
                    return {
                        data: json.user
                    }
                }
                return {
                    data: null
                }
            },
        }),

        changeFavorites: builder.mutation<{message: string}, ChangeFavoriteDto>({
            invalidatesTags: ['User'],
            query: (body) => ({
                url: '/users/favorite',
                method: 'PUT',
                body
            })
        }),

        changeCompare: builder.mutation<{message: string}, ChangeCompareDto>({
            invalidatesTags: ['User', 'Products', 'Characteristics'],
            query: (body) => ({
                url: '/users/compare',
                method: 'PUT',
                body
            })
        })
    })
})

    

export const {
    useEnterByTokenQuery,
    useGetUsersQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
    useChangeFavoritesMutation,
    useChangeCompareMutation,
    useDeleteUserMutation,
} = userApiSlice


