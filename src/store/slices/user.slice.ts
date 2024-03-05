import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserModel } from "../../models/entities/user.model"
import { LoginFormModel } from "../../components/forms/LoginForm.component"

interface UserSliceModel {
    accessData: LoginFormModel | null
}

const initialState: UserSliceModel = {
    accessData: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        enter: (state, action: PayloadAction<LoginFormModel>) => {
            state.accessData = action.payload
        },
        exit: (state) => {
            state.accessData = null
        }
    }
})

export const {
    enter,
    exit
} = userSlice.actions

export default userSlice.reducer