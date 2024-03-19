import { LabelModel } from "../../models/entities/label.model"

interface LabelMenuItemProps {
    label: LabelModel
    value: number | string | null
}

export const LabelMenuItem = ({
    label
}: LabelMenuItemProps) => {
    return (
        <div 
            className="grow text-center rounded-md p-1 text-xl font-bold"
            style={{background: label.color}}
            >
            {label.name}
        </div>
    )
} 