import { MouseEvent } from 'react'
import { CardControl } from '../card-control.component'

interface BrandCardProps {
    src: string
    onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const BrandCard = ({
    src,
    onEdit,
    onDelete

}: BrandCardProps) => {

    console.log(src);
    

    return (
        <div 
            className="relative  max-w-[230px] rounded-md min-h-[50px] shadow-md flex  justify-center items-center h-24 w-52"
        >
            <div className='p-1  border  w-full h-full'>
                <img 
                    src={src} 
                    alt="brand" 
                    className='rounded-md object-contain w-full h-full overflow-hidden'

                />  
            </div>
            <CardControl
                className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4"
                onDelete={onDelete}
                onEdit={onEdit}
            />      
        </div>
    )
}