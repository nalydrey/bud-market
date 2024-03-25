import { Skeleton } from "@mui/material"


export const ProductCardPreloader = () => {
    return (
        <div className="w-full max-w-[300px] h-[300px] flex flex-col gap-2 items-center border p-3 rounded-lg">
            <div className="flex justify-between w-full">
                <Skeleton variant="rounded" width={100} height={30} /> 
                <div className="flex gap-2">
                    <Skeleton variant="rounded" width={30} height={30}/> 
                    <Skeleton variant="rounded" width={30} height={30}/> 
                </div> 
            </div>
            <Skeleton variant="rounded" width={150} height={150}/> 
            <Skeleton variant="rounded" width={200} height={20}/> 
            <div className="flex justify-between w-full items-end mt-5">
                <Skeleton variant="rounded" width={70} height={30}/> 
                <div className="flex gap-2 items-end">
                    <Skeleton variant="rounded" width={100} height={15}/> 
                    <Skeleton variant="rounded" width={50} height={50}/> 
                </div>
            </div>
        </div>
    )
}