import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalWindows {
    openedList: string[]
}

const initialState: ModalWindows = {
    openedList: []
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        openModal: (state, action: PayloadAction<string>) => {
            const set = new Set([...state.openedList, action.payload])
            state.openedList = Array.from(set)
        },

        closeModal: (state, action: PayloadAction<string>) => {
            const set = new Set(state.openedList)
            set.delete(action.payload)
            state.openedList = Array.from(set)
        }
    }
})

export const {
    closeModal, 
    openModal
} = modalSlice.actions

export default modalSlice.reducer