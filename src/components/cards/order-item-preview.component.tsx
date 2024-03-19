import { OrderItem } from "../../models/entities/order-item.model"

interface OrderItemPreviewProps {
    order: OrderItem
}

export const OrderItemPreview = ({
    order
}: OrderItemPreviewProps) => {

    const {product, qty} = order


    return (
        <div className="border p-2 rounded-lg shadow-lg items-center gap-2 grid grid-cols-6 justify-items-start ">
                <div className="w-14 col-span-1">
                    <img src={product.images[0].fileName} alt="" />
                </div>
                <div className="text-md col-span-3">
                    {product.title}
                </div>
                <div className="text-md font-bold text-2xl">
                    {qty} од
                </div>
                <div className="text-xl">
                    {product.priceHistory[0].value*qty} грн
                </div>
        </div>
    )
}