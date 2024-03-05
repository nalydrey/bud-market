import { FilterItem } from "../../../components/filter-item.component"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { ProductCard } from "../../../components/cards/Card.component"
import { transformStatus } from "../../../features/transform-status.func"
import { BrandModel } from "../../../models/entities/brand.model"
import { RangeSlider } from "../../../components/range-slider.component"
import { useGetBrandsQuery } from "../../../api/brandApi"
import { useGetProductsQuery } from "../../../api/productApi"
import { useGetCharacteristicsGroupQuery } from "../../../api/characteristicApi"
import { FilterMenuItem } from "../../../components/filter-menu-item.component"
import { QueryBuilderCharacteristic } from "../../../models/dto/queryBuilder-characteristic.model"

export const FilterPage = () => {

    const params = useParams()
    const [brandIdList, setBrandList] = useState<number[]>([])
    const [finalRange, setFinalRange] = useState<[number, number]>([0, 10000])
    const [characteristics, setCharacteristics] = useState<QueryBuilderCharacteristic[]>([])

    const {data:brands, isSuccess: isBrandsSuccess} = useGetBrandsQuery({filter:{products: {category: {systemName: params.categoryName}}}})

    
    const {data: products, isSuccess} = useGetProductsQuery({
        page: 0,
        filter: {
            category: {systemName: params.categoryName},
            brand: {
                id: brandIdList
            },
            price: finalRange,
            characteristics: characteristics
        }
    })
    

    const {data: characteristicGroups, isSuccess: isSuccessCharacteristicGroups} = useGetCharacteristicsGroupQuery(params.categoryName || '')

    const handleClickBrand = (brand: BrandModel) => {
        const set = new Set(brandIdList)
        set.has(brand.id) 
            ? set.delete(brand.id) 
            : set.add(brand.id)
            console.log(set.has(brand.id));
            console.log(set);
        setBrandList(Array.from(set))
    }
    

      const handleMouseUp = (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        if(Array.isArray(value) && value.length === 2)
        setFinalRange([value[0], value[1]])
      }

      const handleClickCharacteristic = (characteristic: QueryBuilderCharacteristic) => {
        const isExist = characteristics.some(item => {
            return Object.entries(item).every(field => {
                const key = field[0] as keyof QueryBuilderCharacteristic
                return characteristic[key] === field[1]
            })
        })
        console.log('exist', isExist);
        if(!isExist) return setCharacteristics([...characteristics, characteristic])

        const filterArr = characteristics.filter(item => {
            return !Object.entries(item).every(field => {
                const key = field[0] as keyof QueryBuilderCharacteristic
                return characteristic[key] === field[1]
            })
        })
        setCharacteristics(filterArr)
      }

console.log(characteristics);

      
    return (
        <div className="flex gap-5">
            <div className="max-w-[310px] w-full border flex flex-col ">
                    <FilterItem
                        title="Бренди"
                    >
                        <ul className="p-3 text-white flex flex-col gap-2">
                            {   
                                isBrandsSuccess &&
                                brands.map(brand => {
                                    const isChanged = brandIdList.includes(brand.id)
                                    return (
                                        <li>
                                            <FilterMenuItem
                                                isChanged = {isChanged}
                                                label={brand.name}
                                                onClick={() => handleClickBrand(brand)}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </FilterItem>
                    <FilterItem
                        title="Ціна"
                    >
                        <RangeSlider
                            max={1000}
                        />
                    </FilterItem>
                    {
                        isSuccessCharacteristicGroups &&
                        characteristicGroups.map(group => (
                            <FilterItem
                                title={group.name}
                            >
                                <ul className="p-3 text-white flex flex-col gap-2">
                                    {
                                        group.payload.map(item => {
                                            const isChanged = characteristics.some(elem => {
                                                return (elem.name === group.name &&
                                                elem.unit === item.unit &&
                                                elem.value === item.value)
                                            })
                                            return (
                                            <li>
                                                <FilterMenuItem
                                                    isChanged = {isChanged}
                                                    label={`${item.value} ${item.unit ? item.unit : ''}`}
                                                    onClick={() => handleClickCharacteristic({name: group.name, ...item})}
                                                />
                                            </li>
                                        )
                                        })
                                    }
                                </ul>
                            </FilterItem>
                                ))
                    }
            </div>
            <div className="border w-full grid grid-cols-3 gap-5">
                {
                    isSuccess &&
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            price={product.priceHistory[0].value}
                            src={product.images.map(product => 'http://localhost:3030/' + product.fileName)}
                            title={product.title}
                            label={product.label && {color: product.label.color, title: product.label.name}}
                            status={transformStatus(product.status)}
                            oldPrice={product.priceHistory[1] && product.priceHistory[1].value}
                        />
                    ))
                }
            </div>
        </div>
    )
}