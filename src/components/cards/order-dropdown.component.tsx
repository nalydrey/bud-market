import { format } from "@formkit/tempo"
import { OrderModel } from "../../models/entities/order.model"
import { ArchiveBoxArrowDownIcon, BriefcaseIcon, ChevronDownIcon, HandRaisedIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useMemo, useState } from "react"
import { OrderItemComp } from "./order-item.component"
import { IconButton } from "@mui/material"

const formatDate = (date: Date) => {
    return format(date, {date: 'short', time: 'short'})
}

interface OrderDropDownProps {
    order: OrderModel
    isControlButtons?: boolean
    onClickAccept?: (order: OrderModel) => void
    onClickDelete?: (order: OrderModel) => void
    onClickTake?: (order: OrderModel) => void
    onClickDecline?: (order: OrderModel) => void
}

export const OrderDropDown = ({
    order,
    isControlButtons = false,
    onClickAccept,
    onClickDelete,
    onClickDecline,
    onClickTake
}: OrderDropDownProps) => {

    const {id, createdDate, completeDate, goods, status } = order
    const orderNumber = id.toString().padStart(5, '0')

    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const totalPrice = useMemo(()=>{
        const total: number[] = []
        goods.forEach(item => {total.push(item.product.priceHistory[0].value * item.qty)})
        return total.reduce((acum, item) => item+acum, 0)
    }, [order])

    const handleClickAccept = () => {
        onClickAccept && onClickAccept(order)
    }

    const handleClickDelete = () => {
        onClickDelete && onClickDelete(order)
    }

    const handleClickTake = () => {
        onClickTake && onClickTake(order)
    }
    
    const handleCkickDecline = () => {
        onClickDecline && onClickDecline(order)
    }



    return (
        <div className="">
            <button 
                className="w-full grid grid-cols-12 justify-items-start gap-3 justify-between items-center border border-gray-400 p-3 px-5 rounded-md bg-gray-primary"
                onClick={handleClick}
            >
                <span className="font-bold text-md col-span-3 justify-self-start">Замовлення № {orderNumber}</span>
                <span className="col-span-3">Створено {formatDate(createdDate)}</span>
                {
                status === 'new' &&
                <span className="col-span-3">Чекає на оброблення</span>
                }
                {
                status === 'inProgress' &&
                <span className="col-span-3">Обробляється</span>
                }
                {
                status === 'completed' &&
                <span className="col-span-3">Отримано {completeDate && formatDate(completeDate)}</span>
                }
                {
                status === 'refused' &&
                <span className="col-span-3">Відмовлено</span>
                }
                {
                    isControlButtons &&
                    <div 
                        className="col-span-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IconButton
                            onClick={handleClickAccept}
                        >
                            <ArchiveBoxArrowDownIcon className="w-6"/>
                        </IconButton>
                        <IconButton
                            onClick={handleClickTake}
                        >
                            <BriefcaseIcon className="w-6"/>
                        </IconButton>
                        <IconButton
                            onClick={handleCkickDecline}
                        >
                            <HandRaisedIcon className="w-6"/>
                        </IconButton>
                        <IconButton
                            onClick={handleClickDelete}
                        >
                            <TrashIcon className="w-6"/>
                        </IconButton>
                    </div>
                }
                <ChevronDownIcon className={`w-6 ${open ? 'rotate-180' : ''} duration-200 col-span-1 justify-self-end`}/>
            </button>
            <div className={`${open ? 'max-h-[500px]' : 'max-h-0'}  duration-200 overflow-hidden`}>
                <div className="flex flex-col p-5 gap-2 border-b-[3px] border-gray-500">
                    {
                        goods.map(product => (
                            <OrderItemComp key={product.id} orderItem={product}/>
                        ))
                    }
                </div>
                <div className="py-3 flex justify-between">
                    <span className="text-xl font-bold">Разом:</span>
                    <span className="text-xl font-bold">{totalPrice} грн</span>
                </div>
            </div>
        </div>
    )
}