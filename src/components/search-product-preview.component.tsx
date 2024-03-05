import defaultImg from '../assets/images/Rectangle 20.png'

interface SearchProductPreviewProps {
    src?: string
    title: string
    price: number
    union?: string
}

export const SearchProductPreview = ({
    title,
    src,
    price,
    union = '₴'
}: SearchProductPreviewProps) => {
    return (
       <div className='flex gap-10 p-2'>
            <div className='w-16 h-16 border'>
                <img src={src || defaultImg} alt="" className='object-contain w-full h-full' />
            </div>
            <h3 className='w-[280px]'>{title}</h3>
            <span className='text-bold text-xl w-20'>{price} {union}</span>
       </div> 
    ) 
}