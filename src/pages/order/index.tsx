import { useCreateOrderMutation } from "../../api/orderApi"
import { UniButton } from "../../components/buttons/UniButton.component"
import { OrderForm } from "../../components/forms/order-form.component"
import { useBasket } from "../../hooks/useBasket"
import { CreateOrderItemDto } from "../../models/dto/create-order-item.dto"
import { OrderFormModel } from "../../models/forms/order-form.model"



export const OrderPage = () => {

    const {totalPrice, itemQty, items} = useBasket()
    const [createOrder] = useCreateOrderMutation()

    const handleSubmit = (form: OrderFormModel) => {
        const transformProducts: CreateOrderItemDto[] = form.goods.map(good => ({
            productId: good.product.id,
            qty: good.qty
        }))
        createOrder({...form, goods: transformProducts})
    }
    

    return (
        <div className="container mx-auto ">
            <div className="flex my-5 gap-24">
                <div className="grow">
                    <OrderForm
                        goods={items}
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
                title="Далі"
            />
        </div>
    )
}