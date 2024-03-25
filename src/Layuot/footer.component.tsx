import { MouseEvent } from "react"
import { LogoIcon } from "../components/icons/LogoIcon"
import {companyInfo} from '../data/companyInfo'
import { navigation } from "../data/navigation"
import { CategoryModel } from "../models/entities/category.model"
import { NavigationModel } from "../models/navigation.model"

interface FooterProps {
    categories: CategoryModel[]
    onClickCategory?: (category: CategoryModel) => void
    onClickLink?: (nav: NavigationModel) => void
}
 

export const Footer = ({
    categories,
    onClickCategory,
    onClickLink
}: FooterProps) => {

    const handleClickCategory = (category: CategoryModel) => {
        onClickCategory && onClickCategory(category)
    }
    
    const handleClickLink = (page: NavigationModel) => {
        onClickLink && onClickLink(page)
    }

    return (
        <footer className=" bg-gray-dark text-white py-11">
            <div className="container mx-auto flex gap-5 justify-around">
                <ul className="flex flex-col gap-3">
                    {categories.map(category => (
                        <li>
                            <button 
                                className="first-letter:capitalize"
                                onClick={() => handleClickCategory(category)}
                            >
                            {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <nav>
                    <ul className="flex flex-col gap-3 ">
                        {navigation.map(page => (
                             <li className="first-letter:capitalize">
                                <button 
                                    className="first-letter:capitalize"
                                    onClick={() => handleClickLink(page) }
                                >
                                    {page.title}
                                </button>
                             </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col justify-between">
                    <LogoIcon/>
                    <span>{companyInfo.contacts.phone}</span>
                    <div className="text-sm">
                        <p>Згода користувача</p>
                        <p>«Copyright © Назва 2023»</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}