import { ChartBarIcon } from '@heroicons/react/24/solid'
import { IconButton } from '../buttons/IconButton.component'
import { CheckIcon, HeartIcon } from '@heroicons/react/24/outline'
import { OutlinedSvgButton } from '../buttons/OutlinedSvgButton.component'
import { MouseEvent, useState } from 'react'
import { CardControl } from '../card-control.component'

interface Label {
    title: string
    color: string
}

interface ProductCardProps {
    isLoading?: boolean
    onCompare?: (e: MouseEvent<HTMLButtonElement>) => void
    onFavorite?: (e: MouseEvent<HTMLButtonElement>) => void
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
    onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
    onClickCard?: (e: MouseEvent) => void
    isFavorite?: boolean
    src: string[]
    label?: Label | null
    title: string
    price: number
    oldPrice?: number
    union?: string
    status?: Label
}

export const ProductCard = ({
    onDelete,
    onEdit,
    onCompare,
    onFavorite,
    onClickCard,
    isLoading,
    isFavorite,
    src,
    label,
    title,
    price,
    oldPrice,
    status,
    union = '₴'
}: ProductCardProps) => {

    const [number, setNumber] = useState<number>(0)

    const handleChangeSlide = (index: number) => {
        setNumber(index)
    }

    return (
        <div className=' relative rounded-sm max-w-[310px] border p-3 pb-0 w-full flex flex-col gap-1'>
            <div className='flex justify-end gap-1'>
                <IconButton
                    icon = {<ChartBarIcon className= ' text-gray-secondary'/>}
                    onClick={onCompare}
                />
                <IconButton
                    icon = {<HeartIcon className= {`${isFavorite ? 'text-red-500 fill-red-300' : 'text-gray-secondary'}`}/>}
                    onClick={onFavorite}
                />
            </div>
            {/*------------------- Slider -----------------------*/}
            <div className='grow flex flex-col max-h-44'>
                <div className='flex items-center justify-center mt-1 mb-3 max-w-[200px] overflow-hidden grow self-center'>
                    <img src={src[number]} alt="image" className='w-full h-full object-contain' />
                </div>
                <div className='flex gap-1'>
                    {
                        src.map((img, i) => (
                           <button 
                                key = {i}
                                className={`h-[3px] grow ${number === i ?'bg-orange-primary' : 'bg-gray-secondary'}`}
                                onClick={() => handleChangeSlide(i)}
                            />
                           ) 
                        ) 
                    }
                </div>
            </div>
            {/* ------------------------------------------------- */}
            <div className='pr-14 mt-3 min-h-[60px]'>
                <h3 
                    className=' font-semibold hover:underline cursor-pointer'
                    onClick={onClickCard}
                >{title}</h3>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <span className='text-2xl font-bold  '>{price}{union}</span>
                        {
                           oldPrice && <span className='text-xl text-gray-secondary line-through'>{oldPrice}{union}</span> 
                        }
                    </div>
                    {
                        status &&
                        <div 
                            className='flex items-end gap-1 text-green-600'
                            style={{color: status.color}}
                        >
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
                <div 
                    className={`absolute top-3 left-3 text-white py-1 px-2  text-sm`}
                    style={{background: label.color}}
                >
                    {label.title}
                </div>
            }
            <CardControl
                className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/2'
                onDelete={onDelete}
                onEdit={onEdit}
            />
            {isLoading && <div className='absolute bg-white/50 w-full h-full'/>}
        </div>
    )
}