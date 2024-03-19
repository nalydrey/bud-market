import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserModel } from "../../models/entities/user.model"

interface UserSliceModel {
    user: UserModel | null
    token: string | null
}

const initialState: UserSliceModel = {
    user: null,
    token: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        enter: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload
        },
        exit: (state) => {
            state.user = null
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        }
    }
})

export const {
    enter,
    exit,
    setToken
} = userSlice.actions

export default userSlice.reducer