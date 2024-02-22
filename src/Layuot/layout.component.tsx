import { Outlet } from "react-router-dom"
import { Header } from "./header.component"
import { Footer } from "./footer.component"
import { SubHeader } from "./subheader.component"
import { useGetTreeCategoriesQuery } from "../api/categoryApi"

export const Layout = () => {

    const {data: categories, isSuccess} = useGetTreeCategoriesQuery(undefined)


    return (
        <>
            <Header
                basketCounter={17}
                statisticCounter={45}
                favouriteCounter={71}
                totalPrice={431}
            />
            
            <SubHeader
                categories={isSuccess ? categories : []}
            />
            <main className="grow">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}