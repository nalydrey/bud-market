import { useDeleteLabelMutation, useGetLabelsQuery } from "../../../api/labelApi"
import { CardControl } from "../../../components/card-control.component"



export const LabelsPage = () => {

    const {data: labels, isSuccess} = useGetLabelsQuery(undefined)
    const [deleteLabel] = useDeleteLabelMutation()


    const handleDeleteLabel = (id: number) => {
        deleteLabel(id)
    }
    

    return (
        <div className="flex gap-2">
            {
                isSuccess &&
                labels.map(label => {
                    return (
                        <div 
                            className="relative max-w-sm p-1 w-full"
                            key={label.id}
                            style={{background: label.color}}
                        >
                            {label.name}
                            <CardControl
                                className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4"
                                onDelete={() => handleDeleteLabel(label.id)}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}