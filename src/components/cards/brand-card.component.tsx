import { CardControl } from '../card-control.component'
import { BrandModel } from '../../models/entities/brand.model'

interface BrandCardProps {
    brand: BrandModel
    onEdit?: (brand: BrandModel) => void
    onDelete?: (brand: BrandModel) => void
}

export const BrandCard = ({
    brand,
    onEdit,
    onDelete

}: BrandCardProps) => {

    const {logoImg, name} = brand
    
    const handleDelete = () => {
        onDelete && onDelete(brand)
    }

    const handleEdit = () => {
        onEdit && onEdit(brand)
    }

    return (
        <div 
            className="relative  max-w-[230px] rounded-md min-h-[50px] shadow-md flex  justify-center items-center h-24 w-52"
        >
            {
                logoImg ?
                <div className='p-1  border  w-full h-full'>
                    <img 
                        src={logoImg} 
                        alt="brand" 
                        className='rounded-md object-contain w-full h-full overflow-hidden'

                    />  
                </div>
                :
                <span className='text-2xl font-bold'>{name}</span>
            }
            
            <CardControl
                className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4"
                onDelete={handleDelete}
                onEdit={handleEdit}
            />      
        </div>
    )
}