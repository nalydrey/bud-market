import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SeverityType = 'error' | 'info' | 'success' | 'warning'

interface InfoSliceModel {
    open: boolean
    message: string
    severity: SeverityType
}

const initialState: InfoSliceModel = {
    open: false,
    message: '',
    severity: 'info'
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        open: (state, action: PayloadAction<{message: string, severity?: SeverityType}>) => {
            state.open = true
            state.message = action.payload.message
            state.severity = !action.payload.severity ? 'info' : action.payload.severity
        },

        close: (state) => {
            state.open = false
        }
    }
})

export const {open, close} = infoSlice.actions

export default infoSlice.reducer