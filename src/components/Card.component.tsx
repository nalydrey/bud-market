import { ChartBarIcon } from '@heroicons/react/24/solid'
import { IconButton } from './IconButton.component'
import { CheckIcon, HeartIcon } from '@heroicons/react/24/outline'
import { OutlinedSvgButton } from './OutlinedSvgButton.component'
import { MouseEvent } from 'react'

interface Label {
    title: string
    color: string
}

interface ProductCardProps {
    onChart?: (e: MouseEvent<HTMLButtonElement>) => void
    onFavorite?: (e: MouseEvent<HTMLButtonElement>) => void
    src: string
    label?: Label 
    title: string
    price: number
    oldPrice?: number
    union?: string
    status?: Label
}

export const ProductCard = ({
    onChart,
    onFavorite,
    src,
    label,
    title,
    price,
    oldPrice,
    status,
    union = '₴'
}: ProductCardProps) => {
    return (
        <div className=' relative rounded-sm max-w-[310px] border p-3 pb-0 w-full'>
            <div className='flex justify-end gap-1'>
                <IconButton
                    icon = {<ChartBarIcon className= ' text-gray-secondary'/>}
                    onClick={onChart}
                />
                <IconButton
                    icon = {<HeartIcon className= ' text-gray-secondary'/>}
                    onClick={onFavorite}
                />
            </div>
            {/*------------------- Slider -----------------------*/}
            <div>
                <div className='flex items-center justify-center mt-1 mb-3'>
                    <img src={src} alt="image" />
                </div>
                <div className='flex gap-1'>
                    <button className='h-[2px] bg-gray-secondary grow'></button>
                    <button className='h-[2px] bg-orange-primary grow'></button>
                    <button className='h-[2px] bg-gray-secondary grow'></button>
                    <button className='h-[2px] bg-gray-secondary grow'></button>
                </div>
            </div>
            {/* ------------------------------------------------- */}
            <div className='pr-14 mt-3 min-h-[60px]'>
                <h3 className=' font-semibold '>{title}</h3>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <span className='text-2xl font-bold  '>{price}{union}</span>
                        {
                           oldPrice && <span className='text-xl text-gray-secondary line-through'>{oldPrice}{union}</span> 
                        }
                    </div>
                    {
                        status &&
                        <div className='flex items-end gap-1 text-green-600'>
                            <CheckIcon className='w-4 h-4'/>
                            <span className='text-sm'>{status.title}</span>
                        </div>
                    }
                </div>
            
                <OutlinedSvgButton
                    className='absolute right-0 bottom-0'
                />
            </div>
            {
                label &&
                <div className='absolute top-3 left-3 bg-blue-dark text-white py-1 px-2  text-sm'>
                    {label.title}
                </div>
            }
        </div>
    )
}