import { useNavigate } from "react-router-dom"
import { Header } from "../../Layuot/header.component"  
import { Footer } from "../../Layuot/footer.component" 
import { SubHeader } from "../../Layuot/subheader.component" 
import { useGetTreeCategoriesQuery } from "../../api/categoryApi" 
import { useGetProductsQuery } from "../../api/productApi" 
import { useState } from "react" 
import { useBasket } from "../../hooks/useBasket" 
import { useModalProvider } from "../../hooks/useModalProvider" 
import { useUser } from "../../hooks/useUser" 
import { Breadcrumbs } from "@mui/material" 
import { usePage } from "../../hooks/usePage" 
import { PageLabel } from "../page-label.component"
import { NavigationModel } from "../../models/navigation.model"
import { CategoryModel } from "../../models/entities/category.model"


interface LayoutProps {
    children?: JSX.Element
}


export const Layout = ({
    children
}: LayoutProps) => {

    const [like, setLike] = useState<string>('')

    const navigate = useNavigate()

    const {breadcrumbs, currentPath, currentName} = usePage()
    const {totalPrice, itemQty} = useBasket()
    const {user, moveToOffice, leaveApp} = useUser()
    const {open} = useModalProvider()


    const {data: categories, isSuccess} = useGetTreeCategoriesQuery(undefined)
    const {data} = useGetProductsQuery({page: 0, filter: {like}})

   

    const moveTo = (page: string) => {
        navigate(page)
    }

    const handleDebounce = (str: string) => {
        setLike(str)
    }

    const handleMenuItem = (name: string) => {
        if(name === 'register' || name === 'login') open(name)
        if(name === 'office') moveToOffice()
        if(name === 'exit') leaveApp()
    }
   

    const handleClickBreadcrumb = (path: string) => {
        navigate(path)
    }

    const handleClickLink = (link: NavigationModel) => {
        navigate(link.path)
    }

    const handleClickCategory = (category: CategoryModel) => {
        navigate(`/catalog/${category.systemName}`)
    }


    return (
        <>
            <Header
                basketCounter={itemQty}
                statisticCounter={user ? user.compare.length : 0}
                favouriteCounter={user ? user.favorite.length : 0}
                totalPrice={totalPrice}
                onClickFavourite={() => moveTo('favorites')}
                onClickBasket={() => moveTo('basket')}
                onClickCompare={() => moveTo('compare')}
                onClickLogo={() => moveTo('/')}
                onClickMenuItem={handleMenuItem}
            />
            
            <SubHeader
                categories={isSuccess ? categories : []}
                products={data?.products || []}
                onDebounce={handleDebounce}
                onClickLink={handleClickLink}
                onClickCategory={handleClickCategory}
            />
            {
                currentPath !== '/' && currentPath !== '/sww' &&
                <div className="container mx-auto flex flex-col gap-4 my-5">
                    <Breadcrumbs 
                        separator="/"
                    >
                        {
                            breadcrumbs.map(breadcrumb => (
                                <button
                                    className=""
                                    onClick={() => handleClickBreadcrumb(breadcrumb.path)}
                                >{breadcrumb.title}</button>
                            ))
                        }
                    </Breadcrumbs>
                    {
                        currentName &&
                        <PageLabel
                            title={currentName}
                        />
                    }
                </div>
            }
            <main className="grow">
                {children}
            </main>
            <Footer
                categories={isSuccess ? categories : []}
                onClickLink={handleClickLink}
                onClickCategory={handleClickCategory}
            />  
        </>
    )
}