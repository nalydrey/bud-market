import { FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material"
import { ReactNode, useMemo } from "react"

interface SelectorProps {
    id: string
    label: string
    name: string
    value: string | number | null
    children: JSX.Element | JSX.Element[] | boolean
    onChange: (event: SelectChangeEvent<string | number | null>, child: ReactNode) => void
}

export const Selector = ({
    id,
    label,
    name,
    value,
    children,
    onChange
}: SelectorProps) => {


    const childArr = useMemo(() => {
        if(typeof children === 'boolean') return [] 
        return Array.isArray(children) ? children : [children]
        
    }, [children])



    return (
        <FormControl 
            fullWidth
            variant="standard" 
        >
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                name={name}
                value={value}
                onChange={onChange}
                label={label}
            >
                <MenuItem  value={''}>
                <p className="font-bold text-xl text-center grow">Не обрано</p> 
                </MenuItem>
                {
                    
                    childArr.map(child => {
                        return (
                        <MenuItem key={child.key} value={child.props.value}>
                            {child}
                        </MenuItem>
                    )})
                }
            </Select>
        </FormControl>
    )
}