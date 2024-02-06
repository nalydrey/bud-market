import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalWindows {
    open: string[]
}

const initialState: ModalWindows = {
    open: []
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        openModal: (state, action: PayloadAction<string>) => {
            const set = new Set([...state.open, action.payload])
            state.open = Array.from(set)
        },

        closeModal: (state, action: PayloadAction<string>) => {
            const set = new Set(state.open)
            set.delete(action.payload)
            state.open = Array.from(set)
        }
    }
})

export const {
    closeModal, 
    openModal
} = modalSlice.actions

export default modalSlice.reducer