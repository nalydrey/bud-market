import { useDeleteOrderMutation, useEditOrderMutation, useGetOrdersQuery } from "../../../api/orderApi"
import { OrderDropDown } from "../../../components/cards/order-dropdown.component";
import { useInfo } from "../../../hooks/useInfo";
import { useUser } from "../../../hooks/useUser";
import { OrderModel, OrderStatus } from "../../../models/entities/order.model";


export const AdminOrderPage = () => {

    const {user} = useUser()
    const { data: orders, isSuccess } = useGetOrdersQuery({status: 'new'})
    const [editOrder, {isSuccess: isSuccessStatus, error}] = useEditOrderMutation()
    const [deleteOrder, {isSuccess: isSuccessDelete, error: errorDelete}] = useDeleteOrderMutation()
 
    

    useInfo([
        {
            isSuccess: isSuccessStatus, successMessage: 'Статус змінено', error
        },
        {
            isSuccess: isSuccessDelete, successMessage: 'Замовлення видалено', error: errorDelete
        }
    ])

    const changeStatus = (order: OrderModel , status: OrderStatus) => {
        editOrder({
            id: order.id,
            status
        })
    }
   
   

    const handleClickDelete = (order: OrderModel) => {
        deleteOrder(order.id)
    }



    
    return (
        <div  className="flex flex-col gap-5">
            {
                isSuccess &&
                orders.map(order => (
                    <OrderDropDown
                      order={order}
                      isControlButtons={user?.role === 'admin'}
                      onClickAccept={(order) => changeStatus(order, 'inProgress')}
                      onClickDelete={(order) => handleClickDelete(order)}
                      onClickDecline={(order) => changeStatus(order, 'refused')}
                      onClickTake={(order) => changeStatus(order, 'completed')}
                    />
                ))
            }
        </div>
    )
}