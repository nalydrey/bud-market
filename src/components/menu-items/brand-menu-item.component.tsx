import { BrandModel } from "../../models/entities/brand.model"


interface BrandMenuItemProps {
    brand: BrandModel
    value: number | string | null
}

export const BrandMenuItem = ({
    brand
}: BrandMenuItemProps) => {
    return (
        <div className="flex items-center gap-5 w-full">
            {
                brand.logoImg &&
                <div className="w-12">
                    <img src={brand.logoImg} alt="" />
                </div>
            }
            <div className="grow text-xl font-bold">{brand.name}</div>
        </div>
    )
}