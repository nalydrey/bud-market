import { useParams } from "react-router-dom"
import { useGetProductQuery } from "../../api/productApi"
import { skipToken } from "@reduxjs/toolkit/query"
import { transformStatus } from "../../features/transform-status.func"
import { UniButton } from "../../components/buttons/UniButton.component"
import { ChartBarIcon, HeartIcon } from "@heroicons/react/24/outline"
import { IconButton } from "../../components/buttons/IconButton.component"
import { useState } from "react"
import { useBasket } from "../../hooks/useBasket"
import { ReviewPage } from "./review-page"

interface ButtonModel {
    name: string
    title: string
}

const buttons: ButtonModel[] = [
    {
        name: 'discription',
        title: 'Опис'
    },
    {
        name: 'characteristics',
        title: 'Характеристики'
    },
    {
        name: 'review',
        title: 'Відгуки'
    },
]

export const SingleProductPage = () => {

    const [page, setPage] = useState<string>(buttons[0].name)
    const params = useParams()
    const {data: product, isSuccess} = useGetProductQuery(params.productId ?? skipToken)
    const {addToBasket} = useBasket()

    console.log(product);
    
    const status = {
        color: '#FFF',
        title: ''
    }
    isSuccess && Object.assign(status, transformStatus(product.status))

    const handleClick = (name: string) => {
        setPage(name)
    }

    const handleAddToBasket = () => {
        isSuccess && addToBasket(product)
    }

    return (
        <>
        {
            isSuccess &&
            <div className="grid grid-cols-2 gap-x-10 gap-y-5 container mx-auto">
                <div className="p-10">
                    <div className="">
                        <img src={product.images[0].fileName} alt="" />
                    </div>
                    <div className="flex gap-3 mt-10">
                        {
                            product.images.map(img => (
                                <div className="w-36">
                                    <img src={img.fileName} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <span style={{color: status.color}}>{status.title}</span>
                    <p>{product.discription}</p>
                    <div>
                        <span className="font-bold text-2xl">{product.priceHistory[0].value} ₴</span>
                       {
                        product.priceHistory[1] &&
                        <span className="font-bold text-2xl">{product.priceHistory[1].value} ₴</span>
                       } 
                    </div>
                    <div className="flex gap-5 items-center">
                        <UniButton
                            title="ДОДАТИ У КОШИК"
                            onClick={handleAddToBasket}
                        />
                        <IconButton
                            icon = {<ChartBarIcon className= ' text-gray-medium'/>}
                            // onClick={onChart}
                        />
                        <IconButton
                            icon = {<HeartIcon className= ' text-gray-medium'/>}
                            // onClick={onFavorite}
                        />
                    </div>
                </div>
                <div className="border-t col-span-2 pt-5 flex flex-col gap-5">
                    <div className="flex gap-5">
                        {
                            buttons.map(but => {
                                const isChanged = but.name === page
                                return (
                                    <button 
                                        name={but.name}
                                        className={`font-bold text-lg  ${isChanged ? 'text-black border-b-4 border-orange-primary' : 'text-gray-secondary'}`}
                                        onClick={()=>{handleClick(but.name)}}
                                    >
                                        {but.title}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className=''>
                        {
                            page === 'discription' &&
                            <p>{product.discription}</p>
                        }
                        {
                            page === 'characteristics' &&
                            <div>
                                <ul className="max-w-xl">
                                {
                                    product.characteristics.map(characteristic => {
                                        const {name, unit, value} = characteristic
                                        return (
                                            <li className="flex justify-between text-xl gap-5">
                                                <p>{name}:</p>
                                                <p>{value} {unit}</p>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        }    
                        {
                            page === 'review' &&
                            <ReviewPage/>
                        }    
                        
                    </div>
                </div>
            </div>
        }
        </>
    )
}