
interface CreateButtonProps {
    name: string
    title: string
    onClick?: (name: string) => void
}

export const CreateButton = ({
    name,
    title,
    onClick
}: CreateButtonProps) => {

    const handleClick = () => {
        onClick && onClick(name)
    }

    return (
        <button 
            className="border px-4 py-2 rounded-lg"
            onClick={handleClick}
        >{title}</button>
    )
}