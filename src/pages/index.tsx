import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Header } from "../Layuot/header.component"
import { Footer } from "../Layuot/footer.component"
import { SubHeader } from "../Layuot/subheader.component"
import { useGetTreeCategoriesQuery } from "../api/categoryApi"
import { useGetProductsQuery } from "../api/productApi"
import { useMemo, useState } from "react"
import { useBasket } from "../hooks/useBasket"
import { useModalProvider } from "../hooks/useModalProvider"
import { ModalProvider } from "../components/modal-provider.component"
import { RegisterForm, RegisterFormModel } from "../components/forms/RegisterForm.component"
import { LoginForm, LoginFormModel } from "../components/forms/LoginForm.component"
import { useCreateUserMutation } from "../api/userApi"
import { useUser } from "../hooks/useUser"
import { Breadcrumbs } from "@mui/material"
import { usePage } from "../hooks/usePage"
import { PageLabel } from "../components/page-label.component"




export const Layout = () => {

    const [like, setLike] = useState<string>('')

    const navigate = useNavigate()

    const {breadcrumbs, pageName} = usePage()
    const {totalPrice, itemQty} = useBasket()
    const {user, moveToOffice, leaveApp, enterToApp} = useUser()
    const {close, open, openedList} = useModalProvider()


    const {data: categories, isSuccess} = useGetTreeCategoriesQuery(undefined)
    const {data: products} = useGetProductsQuery({page: 0, filter: {like}})

    const [createUser] = useCreateUserMutation()
   

    const moveTo = (page: string) => {
        navigate(page)
    }

    const handleDebounce = (str: string) => {
        setLike(str)
    }

    const handleCloseForm = (name: string) => {
        close(name)
    }

    const handleMenuItem = (name: string) => {
        if(name === 'register' || name === 'login') open(name)
        if(name === 'office') moveToOffice()
        if(name === 'exit') leaveApp()
    }

    const handleOnSubmitRegisterForm = (form: RegisterFormModel) => {
        createUser(form)
    }

    const handleSubmitLoginForm = (form: LoginFormModel) => {
        enterToApp(form)
    }

    const handleClickBreadcrumb = (path: string) => {
        navigate(path)
    }


    return (
        <>
            <Header
                basketCounter={itemQty}
                statisticCounter={user ? user.compare.length : 0}
                favouriteCounter={user ? user.favorite.length : 0}
                totalPrice={totalPrice}
                onClickBasket={() => moveTo('basket')}
                onClickCompare={() => moveTo('compare')}
                onClickLogo={() => moveTo('/')}
                onClickMenuItem={handleMenuItem}
            />
            
            <SubHeader
                categories={isSuccess ? categories : []}
                products={products || []}
                onDebounce={handleDebounce}
            />
            <div className="container mx-auto flex flex-col gap-4 my-3">
                <Breadcrumbs 
                    separator="/"
                >
                    {
                        breadcrumbs.map(breadcrumb => (
                            <button
                                className=""
                                onClick={() => handleClickBreadcrumb(breadcrumb.path)}
                            >{breadcrumb.name}</button>
                        ))
                    }
                </Breadcrumbs>
                {
                    pageName &&
                    <PageLabel
                        title={pageName}
                    />
                }
            </div>
            <main className="grow">
                <Outlet/>
            </main>
            <Footer/>
            <ModalProvider
                className='z-10'
                openedList={openedList}
                onClose={handleCloseForm}
            >
                <RegisterForm
                    name = 'register'
                    onSubmit={handleOnSubmitRegisterForm}
                />
                <LoginForm
                    name = 'login'
                    onSubmit={handleSubmitLoginForm}
                />
            </ModalProvider>
        </>
    )
}