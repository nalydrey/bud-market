import { useGetOrdersQuery } from "../../../api/orderApi"


export const AdminOrderPage = () => {

    const { data } = useGetOrdersQuery(undefined)

    console.log(data);
    
    return (
        <div>
            Orders
        </div>
    )
}