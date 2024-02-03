import { MouseEvent } from 'react'
import { IconButton } from './IconButton.component'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

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
            className="relative border max-w-[230px] rounded-md min-h-[50px] shadow-md flex  justify-center items-center"
        >
            <img 
                src={src} 
                alt="brand" 
                className='rounded-md'
            />  
            <div 
                className='absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 border rounded-md px-2 py-1 shadow-md bg-gray-secondary/80 flex gap-2' 
            >
                <IconButton
                    icon={<PencilSquareIcon className='w-6 hover:text-blue-600'/>}
                    onClick={onEdit}
                />
                <IconButton
                    icon={<TrashIcon className='w-6 hover:text-red-600'/>}
                    onClick={onDelete}
                />
            </div>          
        </div>
    )
}