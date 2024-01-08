import { Bars3Icon } from "@heroicons/react/20/solid"
import { Button } from "../components/Button.component"
import { navigation } from "../data/navigation"
import {Input} from "../components/Input.component"
import { CategoryList } from "../components/CategoryList.component"
import { MouseEvent, useEffect, useState } from "react"
import { categories } from "../data/categories"

export const SubHeader = () => {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [sublist, setSublist] = useState<string[]>([])
    const [activeElem, setActiveElement] = useState<string>('')

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

    const handleClickCategoryItem = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        setActiveElement(name)
        console.log(name);
        const item = categories.find(category => category.name === name)
        if(item) {
            setSublist(item.subCategories)
        }
    }

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
                setActiveElement('')
                setSublist([])
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
                <Input/>
                {
                    isOpen &&
                    <CategoryList
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