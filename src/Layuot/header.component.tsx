import { UserButton } from '../components/UserButton.component'
import { BasketIcon } from '../components/icons/BasketIcon'
import { FavoriteIcon } from '../components/icons/FavoriteIcon'
import { LogoIcon } from '../components/icons/LogoIcon'
import { StatisticIcon } from '../components/icons/StatisticIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { companyInfo } from '../data/companyInfo'


interface HeaderProps {
    favouriteCounter?: number
    statisticCounter?: number
    basketCounter?: number
    totalPrice?: number
    onClickFavourite?: ()=>void
    onClickStatistic?: ()=>void
    onClickUser?: ()=>void
    onClickBasket?: ()=>void
    onClickCallback?: ()=>void
    onClickLogo?:()=>void
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
    onClickStatistic,
    onClickUser
}: HeaderProps) => {
    return (
        <header className=' bg-gray-dark font-raleway text-white'>
            <div className='container mx-auto flex gap-5 items-center justify-between'>
                <LogoIcon
                    onClick={onClickLogo}
                />
                <div>Робочий час: {companyInfo.workingTime[0]} - {companyInfo.workingTime[1]}</div>
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
                       onClick={onClickStatistic}
                    />
                    <UserButton
                       icon={<UserIcon/>}
                       onClick={onClickUser}
                    />
                    <UserButton
                       icon={<BasketIcon/>}
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