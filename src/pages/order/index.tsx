import { useEffect, useMemo } from "react"
import { UniButton } from "../../components/buttons/UniButton.component"
import { OrderForm } from "../../components/forms/order-form.component"
import { useBasket } from "../../hooks/useBasket"
import { OrderFormModel } from "../../models/forms/order-form.model"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { usePage } from "../../hooks/usePage"



export const OrderPage = () => {

    const navigate = useNavigate()
    const {totalPrice, itemQty, createOrder, order, isSuccess} = useBasket()
    const {user} = useUser()

    const handleSubmit = (form: OrderFormModel) => {
        createOrder(form)
    }

   

    useEffect(() => {
        if(isSuccess){
            navigate('/thank', {state: order})
        }
    }, [isSuccess])
    
    
    const formData: OrderFormModel | null = useMemo(() => {
        return  user ? {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        } : null
    }, [user])

    return (
        <div className="container mx-auto ">
            <div className="flex my-5 gap-24">
                <div className="grow">
                    <OrderForm
                        data={formData}
                        id = 'orderForm'
                        onSubmit={handleSubmit}
                    />
                </div>
                <div className="bg-gray-dark text-white p-10">
                    <ul className="w-60 flex flex-col gap-5">
                        <li className="flex justify-between text-2xl">
                            <p>Всього:</p>
                            <p className="text-orange-primary">{totalPrice} ₴</p>
                        </li>
                        <li className="flex justify-between text-xl">
                            <p>{itemQty} товарів:</p>
                            <p>{totalPrice} ₴</p>
                        </li>
                    </ul>
                </div>
            </div>
            <UniButton
                form="orderForm"
                title="Оформити"
            />
        </div>
    )
}