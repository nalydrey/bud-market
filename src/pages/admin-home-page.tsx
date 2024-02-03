import { useState } from "react"
import { BrandForm } from "../components/forms/BrandForm.component"
import { ModalProvider } from "../components/modal-provider.component"
import { useCreateBrandMutation } from "../api/createApi"


export const AdminHomePage = () => {

    const [openState, setOpenState] = useState<string[]>([])

    const [createBrand] = useCreateBrandMutation()

    const handleOpenModal = (name: string) => {
        const set = new Set([...openState, name])
        setOpenState(Array.from(set))
    }

    const handleCloseModal = (name: string) => {
        const set = new Set(openState)
        set.delete(name)
        setOpenState(Array.from(set))
    }

    const handleSubmitBrandForm = (form: BrandForm) => {
        const formData = new FormData()
        formData.append('name', form.name)
        form.logoImg && formData.append('file', form.logoImg)
        createBrand(formData)
    }


    
    return (
        <div>
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('brands')}
            >Створити бренд</button>
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('products')}
            >Створити продукт</button>
            <ModalProvider
                openedList = {openState}
                onClose={handleCloseModal}
            >
                <BrandForm
                    name="brands"
                    onSubmit={handleSubmitBrandForm}
                />
            </ModalProvider>
        </div>
    )
}