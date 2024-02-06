import { useGetLabelsQuery } from "../api/createApi"



export const LabelsPage = () => {

    const {data} = useGetLabelsQuery(undefined)

    console.log(data);
    

    return (
        <div>labels</div>
    )
}