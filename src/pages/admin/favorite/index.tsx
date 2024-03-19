import { ProductCard } from "../../../components/cards/product_card.component"
import { useUser } from "../../../hooks/useUser"


export const AdminFavoritePage = () => {

    const {user} = useUser()

    return (
        <div className="flex gap-3">
            {
                user && user.favorite.map(product => (
                    <ProductCard
                        src={product.images.map(img => 'http://localhost:3030/' + img.fileName)}
                        price={product.priceHistory[0].value}
                        title={product.title}
                    />
                ))
            
            }
        </div>
    )
}