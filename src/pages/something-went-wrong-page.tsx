import { useNavigate } from "react-router-dom"
import { ReturnButton } from "../components/buttons/return-button.component"


export const SomethingWentWrongPage = () => {

    const navigate = useNavigate()

    const moveToHome = () => {
        navigate('/')
    }

    return (
        <div className="bg-gray-medium h-full flex items-center justify-center ">
            <div className="p-5 border bg-white rounded-xl shadow-xl flex flex-col gap-5 items-center">
                <h1 className=" text-4xl font-bold">Щось пішло не так</h1>
                <ReturnButton
                    title="На головну"
                    onClick={moveToHome}
                />
            </div>
        </div>
    )
}