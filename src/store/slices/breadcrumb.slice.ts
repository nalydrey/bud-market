import { PayloadAction, createSlice, isAction } from "@reduxjs/toolkit";
import { BreadcrumbsDataModel } from "../../models/breadcrumb.model";

interface InitialState {
    breadcrumbs: BreadcrumbsDataModel[]
}

const initialState: InitialState = {
    breadcrumbs: [{
        name: '',
        title: 'головна',
        path: '/'
    }]
}


export const breadcrumbSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        setBreadcrumbs: (state, action: PayloadAction<BreadcrumbsDataModel[]>) => {
            state.breadcrumbs = [...state.breadcrumbs, ...action.payload]
        },

        deleteBreadcrumbs: (state, action: PayloadAction<BreadcrumbsDataModel[]>) => {
            const names = action.payload.map((item) => item.name)
            state.breadcrumbs =  state.breadcrumbs.filter(item => !names.includes(item.name))
        }
    } 
})

export const {setBreadcrumbs, deleteBreadcrumbs} = breadcrumbSlice.actions

export default breadcrumbSlice.reducer