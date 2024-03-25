import { Outlet } from "react-router-dom"





export const CatalogHomePage = () => {


    return (
        <div className="container mx-auto pt-3 pb-5 flex flex-col gap-10 ">
            <Outlet/>
        </div>
    )
}