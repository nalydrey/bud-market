import { useDeleteProductMutation, useGetProductsQuery } from "../../../api/productApi";
import { ProductCard } from "../../../components/cards/Card.component";
import { transformStatus } from "../../../features/transform-status.func";


export const ProductsPage = () => {



    const {data: products, isSuccess} = useGetProductsQuery(undefined)
    const [deleteProduct] = useDeleteProductMutation()


    const handleDeleteProduct = (id: number) => {
        deleteProduct(id)
    }


    return (
        <div>
            {
                isSuccess && products.map(product => {
                    const {id, priceHistory, label, title, images, status} = product
                    console.log();
                    
                    return (
                        <ProductCard
                            key={id}
                            src={images.map(img => `http://localhost:3030/${img.fileName}`)}
                            title={title}
                            label={label && {color: label.color, title: label.name}}
                            oldPrice={priceHistory[1]?.value}
                            price={priceHistory[0]?.value}
                            status={transformStatus(status)}
                            onDelete={() => handleDeleteProduct(id)}
                            // onChart={}
                            // onFavorite={}
                        />
                    )
                })
            }
        </div>
    )
}