import { TextField } from "@mui/material"
import { ChangeEvent, HTMLInputTypeAttribute } from "react"


interface MUITextFieldProps {
    type?: HTMLInputTypeAttribute 
    label?: string 
    name?: string
    value?: string | number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MUITextField = ({
    type,
    label,
    name,
    value,
    onChange
}: MUITextFieldProps) => {
    return (
        <TextField
        fullWidth
        type={type}
        variant="standard"
        autoComplete="off"
        name={name}
        label={label}
        value = {value}
        onChange={onChange}
    />
    )
}