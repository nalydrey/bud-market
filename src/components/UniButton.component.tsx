
interface UniButtonProps {
    title: string
}

export const UniButton = ({
    title = 'button'
}: UniButtonProps) => {
    return (
        <button 
            className=" bg-orange-primary duration-200 hover:bg-black rounded-md px-8 py-3 uppercase"
        >{title}</button>
    )
}