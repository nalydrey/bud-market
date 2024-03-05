import { queryString } from "object-query-string";
import { CreateUserDto } from "../models/dto/create-user.dto";
import { UserModel } from "../models/entities/user.model";
import { UsersResponce } from "../models/response/users-responce.model";
import { mainApi } from "./createApi";
import { UserResponce } from "../models/response/user-responce.model";
import { ChangeFavoriteDto } from "../models/dto/change-favorite.dto";
import { ChangeCompareDto } from "../models/dto/change-compare.dto";


export const userApiSlice = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UserModel[], undefined>({
            query: () => '/users',
            transformResponse: (responce: UsersResponce) => responce.users 
        }),

        createUser: builder.mutation<UserModel, CreateUserDto>({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body
            })
        }),
       
        loginUser: builder.query<UserModel, LoginDto | null>({
            providesTags: ['Users'],
            query: (loginDto) => {

                const qs = loginDto ? queryString(loginDto): ''
                return `/users/login?${qs}`
            },
            transformResponse: (responce: UserResponce) => responce.user 
        }),

        changeFavorites: builder.mutation<{message: string}, ChangeFavoriteDto>({
            invalidatesTags: ['Users'],
            query: (body) => ({
                url: '/users/favorite',
                method: 'PUT',
                body
            })
        }),

        changeCompare: builder.mutation<{message: string}, ChangeCompareDto>({
            invalidatesTags: ['Users', 'Products', 'Characteristics'],
            query: (body) => ({
                url: '/users/compare',
                method: 'PUT',
                body
            })
        })
    })
})

    

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useLoginUserQuery,
    useChangeFavoritesMutation,
    useChangeCompareMutation
} = userApiSlice