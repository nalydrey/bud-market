import { useState } from "react"

import { useTest } from "../hooks/useTest"

export const TestPage = () => {

    const [openModal, setOpenModal ] = useState<boolean>(false)

    const {user, removeToken, setToken, force} = useTest()

    return (
        <div className="">
            <div className="flex justify-between">
                <button className="border p-2 rounded-md bg-gray-200"
                    onClick={() => setOpenModal(true)}
                >Open Login
                </button>
                <button className="border p-2 rounded-md bg-gray-200"
                    onClick={() => setToken()}
                >Login
                </button>
                <button className="border p-2 rounded-md bg-gray-200"
                    onClick={() => removeToken()}
                >Log Out
                </button>
                <button className="border p-2 rounded-md bg-gray-200"
                    onClick={() => force()}
                >Force
                </button>
                <div>
                    {user?.firstName} {user?.lastName}
                </div>
            </div>

            {/* <ModalWindow
                open = {openModal}
                onClickEmptySpace={() => setOpenModal(false)}
            >
                <FormContainer>
                    <LoginForm
                        onSubmit={enterToApp}
                    />
                </FormContainer>
            </ModalWindow> */}
        </div>
    )
}