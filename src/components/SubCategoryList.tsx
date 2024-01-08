
interface SubCategoryListProps {
    list: string []
}

export const SubCategoryList = ({
    list
}: SubCategoryListProps) => {
    return (
        <ul 
            className="absolute top-0 right-0 translate-x-full min-h-full px-12 py-8  w-[550px] bg-white grid grid-cols-fill "
        >
            {list.map(item => (
                <li >
                    <button className=" first-letter:capitalize hover:text-orange-primary">{item}</button>
                </li>
            ))}
        </ul>
    )
}