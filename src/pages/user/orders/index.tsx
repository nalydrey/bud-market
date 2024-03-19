import { skipToken } from "@reduxjs/toolkit/query"
import { useGetOrdersQuery } from "../../../api/orderApi"
import { useUser } from "../../../hooks/useUser"
import { OrderDropDown } from "../../../components/cards/order-dropdown.component"


export const UserOrderPage = () => {

    const {user} = useUser()
    const {data: orders, isSuccess} = useGetOrdersQuery(user ? {email: user.email} : skipToken )


 return (
    <div  className="flex flex-col gap-5">
            {
                isSuccess &&
                orders.map(order => (
                    <OrderDropDown
                      order={order}
                    />
                ))
            }
        </div>
 )
}