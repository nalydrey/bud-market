import { LogoIcon } from "../components/icons/LogoIcon"
import {companyInfo} from '../data/companyInfo'
import { navigation } from "../data/navigation"
import { categories } from "../data/categories"



 

export const Footer = () => {
    return (
        <footer className=" bg-gray-dark text-white py-11">
            <div className="container mx-auto flex gap-5 justify-around">
                <ul className="flex flex-col gap-3">
                    {categories.map(category => (
                        <li className="first-letter:capitalize">{category.name}</li>
                    ))}
                </ul>
                <nav>
                    <ul className="flex flex-col gap-3 ">
                        {navigation.map(page => (
                             <li className="first-letter:capitalize">{page}</li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col justify-between">
                    <LogoIcon/>
                    <span>{companyInfo.contacts.phone}</span>
                    <div className="text-sm">
                        <p>Згода користувача</p>
                        <p>«Copyright © Название 2023»</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}