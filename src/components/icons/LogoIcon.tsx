import { MouseEvent } from 'react'
import logo from '../../assets/Лого.png'

interface LogoIconProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const LogoIcon = ({
    onClick
}: LogoIconProps) => {
    return (
        <button
            onClick={onClick}
        >
            <img src={logo} alt="LOGO" />
        </button>
    )
}