import { useBasket } from "../../hooks/useBasket"
import { UniButton } from "../../components/buttons/UniButton.component"
import { useNavigate } from "react-router-dom"
import { BasketItemModel } from "../../models/entities/basketItem.model"



export const BasketPage = () => {

    const {items, changeQty, deleteFromBasket} = useBasket()

    const navigate = useNavigate()


    const handleDelete = (basketItem: BasketItemModel) => {
        deleteFromBasket(basketItem)
    }

    const handleIncreace = (basketItem: BasketItemModel) => {
        changeQty(basketItem, true)
    }
    
    const handleReduce = (basketItem: BasketItemModel) => {
        changeQty(basketItem, false)
    }

    const handleOrder = () => {
        navigate('/order')
    }

    return (
        <div className="container mx-auto">
            {
                items.map(item => {
                    const {product, qty} = item
                    return (
                        <div className="flex items-center gap-10">
                            <div className="w-24 h-24 border p-1">
                                <img src={product.images[0].fileName} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-2 text-lg">
                                <button>{product.category.name}</button>
                                <p className="font-bold">{product.title}</p>
                            </div>
                            <span className="text-2xl font-bold">{product.priceHistory[0].value} ₴</span>
                            <div className="flex gap-3 items-center">
                                <button 
                                    className="text-5xl"
                                    onClick={() => handleReduce(item)}
                                >-</button>
                                <span className="text-3xl">{qty}</span>
                                <button 
                                    className="text-5xl"
                                    onClick={() => handleIncreace(item)}
                                >+</button>
                            </div>
                            <span className="text-2xl font-bold">{product.priceHistory[0].value*qty} ₴</span>
                            <button
                                onClick={() => handleDelete(item)}
                            >Видалити</button>
                        </div>
                    )
                    
                })
            }

            <UniButton
                title="Перейти до оформлення"
                onClick={handleOrder}
            />
            
        </div>
    )
}