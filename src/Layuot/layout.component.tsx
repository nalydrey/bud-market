import { Outlet } from "react-router-dom"
import { BasketIcon } from "../components/icons/BasketIcon"
import { FavoriteIcon } from "../components/icons/FavoriteIcon"
import { UserIcon } from "../components/icons/UserIcon"
import { StatisticIcon } from "../components/icons/StatisticIcon"
import { DoneIcon } from "../components/icons/DoneIcon"
import { Header } from "./header.component"
import { Footer } from "./footer.component"
import { SubHeader } from "./subheader.component"

export const Layout = () => {
    return (
        <>
            <Header
                basketCounter={17}
                statisticCounter={45}
                favouriteCounter={71}
                totalPrice={431}
            />
            <SubHeader/>
            <main className="grow">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}