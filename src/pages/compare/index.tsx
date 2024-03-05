import { skipToken } from "@reduxjs/toolkit/query";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { useUser } from "../../hooks/useUser"
import { UniButton } from "../../components/buttons/UniButton.component";
import { useGetCharacteristicsGroupQuery } from "../../api/characteristicApi";
import { useState } from "react";
import { CategoryModel } from "../../models/entities/category.model";
import { useGetProductsQuery } from "../../api/productApi";
import { CompareProductCard } from "../../components/cards/compare-product-card";
import { SERVER_PATH } from "../../constants/server";
import { useChangeCompareMutation } from "../../api/userApi";
import { ProductModel } from "../../models/entities/product.model";


export const ComparePage = () => {

    const {user} = useUser()

    const [currentCategory, setCurrentCategory] = useState<string | undefined>()
    const [changeCompare] = useChangeCompareMutation()
    const {data:products, isSuccess: isSuccessProducts} = useGetProductsQuery(user ? {page: 0, filter: {compareForUsers: {id: user.id}, category: {systemName: currentCategory}}} : skipToken)
    const {data: characteristics, isSuccess: isSuccessCharacteristics} = useGetCharacteristicsGroupQuery(currentCategory ?? skipToken)

    const {data: categories, isSuccess: isSuccessCategories} = useGetCategoriesQuery({page: 0, filter: {productIds: user?.compare.map(product => product.id)} ?? skipToken})

    console.log(characteristics);
    console.log('products', products);
    
    const handleClickButton = (category: CategoryModel) => {
        setCurrentCategory(category.systemName)
    }

    const handleClickClose = (product: ProductModel) => {
        console.log(product.id, );
        
        if(user){
            changeCompare({productId: product.id, userId: user.id})
        }
    }
    
    return (
        <section className="bg-gray-dark h-full">
            <div className="container mx-auto pt-5">
                <div className="flex gap-5">
                    {
                        isSuccessCategories &&
                        categories.map(category => (
                            <UniButton
                                title={category.name}
                                onClick={() => handleClickButton(category)}
                            />
                        ))
                    }
                </div>
                <div >
                    {
                        isSuccessCharacteristics && isSuccessProducts &&                    
                        <table className="border-separate border border-black p-1 text-white block table-fixed">
                            <tr>
                                <td className="min-w-[300px]"></td>
                                {
                                    products.map(product => (
                                        <td className="p-2">
                                            <CompareProductCard
                                                title={product.title}
                                                price={product.priceHistory[0].value}
                                                src={SERVER_PATH + product.images[0].fileName}
                                                // onClickBasket={}
                                                onClickClose={() => handleClickClose(product)}
                                            />
                                        </td>
                                    ))
                                }
                            </tr>
                            <tr className="odd:bg-gray-medium">
                                <td className="p-2">
                                    Brand
                                </td>
                                {
                                    isSuccessProducts &&
                                    products.map(product => (
                                            <td className="p-2">
                                                {product.brand.name}
                                            </td>
                                    ) )
                                }
                            </tr>
                            { 
                                characteristics.map(characteristic => (
                                    <tr className="odd:bg-gray-medium">
                                        <td className="p-2">
                                            {characteristic.name}
                                        </td>
                                        {
                                            products.map(product => {
                                                const matchChar = product.characteristics.find((item) => item.name === characteristic.name)
                                                return (
                                                    <td className="p-2">
                                                        {matchChar?.value}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                    }
                </div>
            </div>
        </section>
    )
}