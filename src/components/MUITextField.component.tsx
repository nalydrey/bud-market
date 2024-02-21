import { TextField, TextFieldVariants } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography"
import { ChangeEvent } from "react"


interface MUITextFieldProps {
    label?: string 
    name?: string
    value?: string | number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MUITextField = ({
    label,
    name,
    value,
    onChange
}: MUITextFieldProps) => {
    return (
        <TextField
        variant="standard"
        autoComplete="off"
        name={name}
        label={label}
        value = {value}
        onChange={onChange}
    />
    )
}