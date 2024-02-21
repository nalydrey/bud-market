import { Outlet, useNavigate } from "react-router-dom"

export const AdminPage = () => {

    const navigate = useNavigate() 

    
    const handleNavigate = (path: string) => {
        navigate(path)
    }

    return (
        <section>
            <div className="container mx-auto">
                <h1 className=" font-prosto text-4xl mb-8">Admin Panel</h1>
                <div className="grid grid-cols-4 gap-5 ">
                    <div className=" bg-gray-dark text-white rounded-md">
                        <button 
                            className="p-4 hover:text-orange-primary border-b w-full text-start"
                            onClick={() => handleNavigate('.')}
                        >Керування</button>
                        <button className="p-4 hover:text-orange-primary border-b w-full text-start">Створити товар</button>
                        <button 
                            className="p-4 hover:text-orange-primary border-b w-full text-start"
                            onClick={() => handleNavigate('brands')}
                        >Бренди</button>
                        <button 
                            className="p-4 hover:text-orange-primary border-b w-full text-start"
                            onClick={() => handleNavigate('labels')}
                        >Мітки</button>
                        <button 
                            className="p-4 hover:text-orange-primary border-b w-full text-start"
                            onClick={() => handleNavigate('categories')}
                        >Категорії</button>
                        <button 
                            className="p-4 hover:text-orange-primary border-b w-full text-start"
                            onClick={() => handleNavigate('products')}
                        >Продукція</button>
              
                    </div>
                    <div className=" col-span-3">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </section>
    )
}