import { useState } from "react"
import { BrandForm } from "./forms/BrandForm.component"
import { ModalProvider } from "./modal-provider.component"


export const ModalFormProvider = () => {

    const [openState, setOpenState] = useState<string[]>([])

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
        <ModalProvider
            openedList = {openState}
            onClose={handleCloseModal}
        >
            <BrandForm
                name="brands"
                onSubmit={handleSubmitBrandForm}
            />
        </ModalProvider>
)
}