import { Menu, MenuItem } from '@mui/material'
import { UserButton } from '../components/buttons/UserButton.component'
import { BasketIcon } from '../components/icons/BasketIcon'
import { FavoriteIcon } from '../components/icons/FavoriteIcon'
import { LogoIcon } from '../components/icons/LogoIcon'
import { StatisticIcon } from '../components/icons/StatisticIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { companyInfo } from '../data/companyInfo'
import { MouseEvent, useState } from 'react'
import { useUser } from '../hooks/useUser'


interface HeaderProps {
    favouriteCounter?: number
    statisticCounter?: number
    basketCounter?: number
    totalPrice?: number
    onClickFavourite?: ()=>void
    onClickCompare?: ()=>void
    onClickBasket?: ()=>void
    onClickCallback?: ()=>void
    onClickLogo?:()=>void
    onClickMenuItem?: (name: string) => void
}


export const Header = ({
    basketCounter,
    favouriteCounter,
    statisticCounter,
    totalPrice,
    onClickLogo,
    onClickBasket,
    onClickCallback,
    onClickFavourite,
    onClickCompare,
    onClickMenuItem
    
}: HeaderProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {user} = useUser()

    const handleClickUser = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    
    const handleClickMenuItem= (name: string) => {
        onClickMenuItem && onClickMenuItem(name)
        setAnchorEl(null);
    }

    return (
        <header className='bg-gray-dark font-raleway text-white '>
            <div className='container mx-auto flex gap-5 items-center justify-between flex-wrap p-2'>
                <LogoIcon
                    onClick={onClickLogo}
                />
                <div className='flex flex-col'><span>Робочий час:</span><span>{companyInfo.workingTime[0]} - {companyInfo.workingTime[1]}</span> </div>
                <div className='flex flex-col gap-1 items-start'>
                    <span className='text-lg'>{companyInfo.contacts.phone}</span>
                    <button 
                        className=' text-orange-secondary underline text-sm'
                        onClick={onClickCallback}
                    >
                        Замовити дзвінок
                    </button>
                </div>
                <div className='flex gap-1 items-center'>
                    <UserButton
                       icon={<FavoriteIcon/>}
                       countValue={favouriteCounter}
                       onClick={onClickFavourite}
                    />
                    <UserButton
                       icon={<StatisticIcon/>}
                       countValue={statisticCounter}
                       onClick={onClickCompare}
                    />
                    <UserButton
                       icon={<UserIcon/>}
                       onClick={handleClickUser}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >   {
                        !user 
                        ?
                        <>
                            <MenuItem onClick={() => handleClickMenuItem('register')}>Реєстрація</MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem('login')}>Вхід</MenuItem>
                        </>
                        :
                        <>
                            <MenuItem onClick={() => handleClickMenuItem('office')}>Перейти у кабінет</MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem('exit')}>Вихід</MenuItem>
                        </>
                         }
                    </Menu>
                    <UserButton
                       icon={<BasketIcon className="stroke-white"/>}
                       countValue={basketCounter}
                       onClick={onClickBasket}
                    />
                    <div className='flex flex-col ml-5'>
                        <span>Всього:</span>
                        <span className='font-bold'>{totalPrice || 0} грн</span>
                    </div>
                </div>
            </div>
        </header>
    )
}