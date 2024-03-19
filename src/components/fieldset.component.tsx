import { FolderPlusIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@mui/material"
import { MouseEvent, ReactNode } from "react"


interface FieldsetProps {
    defaultLegend: string
    defaultText: string
    alternativeText?: string
    alternativeLegend?: string
    alterCondition?: boolean
    icon?: ReactNode
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Fieldset = ({
    defaultLegend,
    defaultText,
    alternativeText = defaultText,
    alternativeLegend = defaultLegend,
    alterCondition = false,
    icon,
    onClick
}: FieldsetProps) => {

    return (
        <fieldset className="border px-2 rounded-md" >
            <legend className="text-xs">
                {
                    alterCondition
                    ? <span>{alternativeLegend}</span>
                    : <span>{defaultLegend}</span>
                    
                }
            </legend>
            <div className="p-1 flex justify-between items-center">
                {
                    alterCondition ? 
                    <span>{alternativeText}</span>
                    :
                    <span>{defaultText}</span>
                }
                <IconButton 
                    className="hover:text-blue-700"
                    onClick={onClick}
                >
                    <div className="w-6">
                        {icon || <FolderPlusIcon/>}
                    </div>
                </IconButton>
            </div>
        </fieldset> 
    )
} 