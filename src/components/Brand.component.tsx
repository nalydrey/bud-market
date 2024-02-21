
interface BrandProps {
    src: string
}

export const Brand = ({
    src
}: BrandProps) => {
    return (
        <div className=" w-52 h-20 rounded-md bg-white flex justify-center items-center p-1">
            <img src={src} alt="brand" />
        </div>
    )
}