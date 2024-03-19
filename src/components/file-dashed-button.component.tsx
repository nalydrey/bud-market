import { ChangeEvent } from "react"


interface FileDashedButtonProps {
    title: string
    url?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileDashedButton = ({
    title,
    url,
    onChange
}: FileDashedButtonProps) => {


    return (
        <label htmlFor="brandLogo" className=" cursor-pointer border rounded-md border-dashed h-20 p-1 flex justify-center items-center hover:bg-slate-400 duration-200">
            <input 
                id='brandLogo'
                className="hidden"
                name="logoImg"
                type="file" 
                onChange={onChange}
            />
            {
                url ?
                <div className="h-full">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
                :
                <div className="text-center w-full">{title}</div>
            }

        </label>
    )
}