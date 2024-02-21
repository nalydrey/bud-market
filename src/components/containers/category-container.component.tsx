

interface CategoryContainerProps {
    children?: JSX.Element | JSX.Element[] | boolean
}

export const CategoryContainer = ({
    children
}: CategoryContainerProps) => {
    return (
        <div className='grid grid-cols-3 gap-7 max-w-[970px] mx-auto'>
                {
                    children ?
                    children :
                    <p>Поки немає категорій</p>
                }
        </div>
    )
}