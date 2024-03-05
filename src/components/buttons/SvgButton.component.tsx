import { ArrowRightIcon } from "@heroicons/react/20/solid"

interface SvgButtonProps {
    className?: string
}

export const SvgButton = ({
    className
}:SvgButtonProps) => {
    return (
        <button className={`p-4 bg-black rounded-tr-md rounded-bl-md duration-200 hover:bg-orange-primary ${className}`}>
            <ArrowRightIcon className="w-6"/>
        </button>
    )
}