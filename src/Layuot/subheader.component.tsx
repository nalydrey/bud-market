import { Bars3Icon } from "@heroicons/react/20/solid"
import { Button } from "../components/buttons/Button.component"
import { navigation } from "../data/navigation"
import {Input} from "../components/inputs/Input.component"
import { CategoryList } from "../components/CategoryList.component"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
// import { categories } from "../data/categories"
import { CategoryModel } from "../models/entities/category.model"
import { SearchProductPreview } from "../components/search-product-preview.component"
import { useDebounceCallback, useDebounceValue } from "usehooks-ts"
import { ProductModel } from "../models/entities/product.model"

interface SubHeaderProps {
    categories: CategoryModel[]
    products: ProductModel[]
    onDebounce?: (str: string) => void
}

export const SubHeader = ({
    categories,
    products,
    onDebounce
}: SubHeaderProps) => {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [sublist, setSublist] = useState<CategoryModel[]>([])
    const [activeElem, setActiveElement] = useState<string>('')
    const [searchString, setSearchString] = useState<string>('')

    const debounced = useDebounceCallback(onDebounce ? onDebounce : () => {}, 500)
    
    useEffect(()=>{
        document.addEventListener('click', closeCatalog)
        return () => {
            document.removeEventListener('click', closeCatalog)
        }
    },[])

    const closeCatalog = () => {
        setOpen(false)
    }

    const handleClickCatalog = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpen(!isOpen)
    }

    const handleClickCategoryItem = (e: MouseEvent<HTMLButtonElement>, item: CategoryModel) => {
        setActiveElement(item.systemName)
        setSublist(item.children)
    }

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        setActiveElement('')
        setSublist([])
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value)
        debounced(e.target.value)
    }

    return (
        <header className=" bg-black text-white">
            <div className="relative py-5 container mx-auto flex items-center gap-10 justify-between">
                <Button
                    startIcon={<Bars3Icon/>}
                    title="Каталог товарів"
                    onClick={handleClickCatalog}
                />
                <nav className="grow">
                    <ul className="flex gap-5 justify-around">
                        {navigation.map(page => (
                            <li className=" first-letter:capitalize">{page}</li>
                        ))}
                    </ul>
                </nav>
                <div className="relative">
                    <Input
                        value={searchString}
                        onChange={handleChange}
                    />    
                    <div className="absolute z-20 top-[110%] right-0 bg-white  text-black shadow-xl min-w-[500px]">
                        {
                            products.map(product => {
                                const {title, images, priceHistory} = product
                                return (
                                    <SearchProductPreview
                                        title={title}
                                        src={'http://localhost:3030/' + images[0].fileName}
                                        price={priceHistory[0].value}
                                    />
                                )
                            })
                            
                        }
                         
                    </div>        
                </div>
                {
                    isOpen &&
                    <CategoryList
                        categories={categories}
                        activeEl={activeElem}
                        sublist = {sublist}
                        onMouseEnter={handleClickCategoryItem}
                        onMouseLeave={handleMouseLeave}
                    />
                }
            </div>
        </header>
    )
}