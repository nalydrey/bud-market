import { OrderItem } from "../../models/entities/order-item.model"
import defaultImg from '../../assets/images/Rectangle 20.png'


interface OrderItemProps {
    orderItem: OrderItem
}


export const OrderItemComp = ({
    orderItem
}: OrderItemProps) => {

    const { product, qty } = orderItem

    return (
        <div className="grid grid-cols-8 items-center border rounded-md p-2">
            <div className="w-20 h-20 col-span-1">
                <img 
                    className="object-contain w-full h-full"
                    src={product.images[0].fileName || defaultImg}  
                    alt="foto" 
                />
            </div>
            <span className="col-span-5">{product.title}</span>
            <span className="col-span-1">{product.priceHistory[0].value} грн x {qty}</span>
            <span className="col-span-1 ">{product.priceHistory[0].value * qty} грн</span>
        </div>
    )
}