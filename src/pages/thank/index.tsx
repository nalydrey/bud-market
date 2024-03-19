import { useLocation, useNavigate } from "react-router-dom"
import { OrderItem } from "../../models/entities/order-item.model";
import { OrderItemPreview } from "../../components/cards/order-item-preview.component";


export const ThankPage = () => {

    const {state} = useLocation()
    const navigate = useNavigate()

    let goods: OrderItem[] = []
    if(state) goods = [...state.goods] 


    const moveToHome = () => {
        navigate('/')
    }

    return (
        <main className="bg-gray-medium h-full flex justify-center items-center">
            {
            state ?
            <div className="border p-5 rounded-xl shadow-xl bg-gray-400 flex flex-col gap-3 items-center">
                <h2 className="text-3xl font-bold first-letter:capitalize">{state.firstName}, Дякуємо за замовлення!!!</h2>
                <h3 className="text-2xl text-blue-600">Номер замовлення {state.id.toString().padStart(5, '0')}</h3>
                <div className="flex flex-col gap-4">
                    {
                        goods.map(item => (
                            <OrderItemPreview
                                order={item}
                            />
                        ))
                    }
                </div>
                <button 
                    className="duration-200 border p-3 rounded-md font-semibold text-xl bg-orange-primary hover:shadow-xl text-white"
                    onClick={moveToHome}
                >Перейти на головну</button>
            </div>
            :
            <div className="border p-5 rounded-xl shadow-xl bg-gray-400 flex flex-col items-center gap-10">
                <h2 className="text-3xl font-bold first-letter:capitalize">Сторінка не доступна</h2>
                <button 
                    className="duration-200 border p-3 rounded-md font-semibold text-xl bg-orange-primary hover:shadow-xl text-white"
                    onClick={moveToHome}
                >Перейти на головну</button>
            </div>
            }
        </main>
    )
}