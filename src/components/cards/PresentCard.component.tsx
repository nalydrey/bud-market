import { MouseEvent } from "react"
import { SvgButton } from "../buttons/SvgButton.component"
import { UniButton } from "../buttons/UniButton.component"

interface PresentCardProps {
    title: string
    isMain?: boolean
    src: string
    className?: string
    onClickCatalog?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const PresentCard = ({
    title,
    isMain,
    src,
    className,
    onClickCatalog
}: PresentCardProps) => {
   
    const handleClickCatalog = (e: MouseEvent<HTMLButtonElement>) => {
        onClickCatalog && onClickCatalog(e)
    }

    return (
        <div 
            className={`relative bg-no-repeat bg-cover rounded-md ${isMain ? 'p-8': 'p-4'} flex flex-col items-start gap-40 ${className}`}
            style={{backgroundImage: `url(${src})`}}
        >
            {
                isMain ?
                <h1 className={`font-prosto text-4xl   `}>{title}</h1>
                :
                <h3 className={`font-prosto text-xl   `}>{title}</h3>
            }
            
            {
                isMain &&
                <UniButton
                    title="перейти до каталогу"
                    onClick={handleClickCatalog}
                />
            }
            <SvgButton 
                className="absolute bottom-0 left-0"
            />
        </div>
    )
}