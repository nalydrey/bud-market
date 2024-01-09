import { SvgButton } from "./SvgButton.component"
import { UniButton } from "./UniButton.component"

interface PresentCardProps {
    title: string
    isMain?: boolean
    src: string
    className?: string
}

export const PresentCard = ({
    title,
    isMain,
    src,
    className
}: PresentCardProps) => {
   

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
                />
            }
            <SvgButton 
                className="absolute bottom-0 left-0"
            />
        </div>
    )
}