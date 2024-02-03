import { Outlet } from "react-router-dom"
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