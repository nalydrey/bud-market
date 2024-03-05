
interface DropDownFilterListContainerProps {
    children?: JSX.Element | JSX.Element[]
}

export const DropDownFilterListContainer = ({
    children
}: DropDownFilterListContainerProps) => {
    <ul className="p-3 text-white flex flex-col gap-2">
        {children}
    </ul>
}