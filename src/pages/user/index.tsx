import { Outlet, useNavigate } from "react-router-dom"
import { SidePanelButton } from "../../components/buttons/SidePanelButton.component"
import { NavButton } from "../../models/nav-button.model"

const userPages: NavButton[] = [
    {
        name: 'Замовлення',
        path: 'orders'
    },
    {
        name: 'Особиста інформація',
        path: '.'
    }
]

export const UserPage = () => {

    const navigate = useNavigate()


    const handleNavigate = (path: string) => {
        navigate(path)
    }

    return (
        <section>
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-5 ">
                <div className=" bg-gray-dark text-white rounded-md">
                   {
                    userPages.map(page => (
                        <SidePanelButton
                            title={page.name}
                            onClick={() => handleNavigate(page.path)}
                        />
                    ))
                   }
                </div>
                <div className=" col-span-3">
                    <Outlet/>
                </div>
            </div>
        </div>
    </section>
    )
}