import { StatusModel } from "../../models/entities/status.model"


interface StatusMenuItemProps {
    status: StatusModel
    value: number | string | null
}

export const StatusMenuItem = ({
    status
}: StatusMenuItemProps) => {
    return (
        <div className="font-bold text-xl text-center grow border rounded-md p-1">{status.label}</div> 
    )
}