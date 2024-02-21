import { CategoryModel } from "../models/entities/category.model"
import defaultphoto from '../assets/images/Rectangle 20.png'


interface SelfNestedCategoryProps {
    category: CategoryModel
    onClick?: (category: CategoryModel) => void
}

export const SelfNestedCategory = ({
    category,
    onClick
}: SelfNestedCategoryProps) => {

    const {name, photo} = category


    const handleClick = (category: CategoryModel) => {
        onClick && onClick(category)
    }

    return (
        <div className="border p-3 flex flex-col gap-2">
            <div className='max-w-[150px] self-center grow'>
                <img src={photo ? 'http://localhost:3030/' + photo.fileName: defaultphoto} alt="" className="object-contain w-full h-full" />
            </div>
            <h2 
                className="text-xl font-bold "
            >
                <button 
                    className="hover:text-orange-primary first-letter:capitalize"
                    onClick={() => handleClick(category)}
                >
                    {name}
                </button>
            </h2>
            <ul>
                {
                    category.children.map(child => {
                        return (
                            <li>
                                <button 
                                    className="hover:text-orange-primary"
                                    onClick={() => handleClick(child)}
                                >{child.name}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}