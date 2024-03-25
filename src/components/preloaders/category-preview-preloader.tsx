import { Skeleton } from "@mui/material"
import { ProductCardPreloader } from "./product-card-preloader"


export const CategoryPreviewPreloader = () => {
    return (
        <div className="max-w-[620px]">
            <div className="flex gap-10 items-center">
                <Skeleton variant="rounded" width={300} height={30} />
                <div className="flex gap-2">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                </div>
            </div>
            <div className=" flex gap-5 mt-8">
                <ProductCardPreloader/>
                <ProductCardPreloader/>
            </div>
        </div>
    )
}