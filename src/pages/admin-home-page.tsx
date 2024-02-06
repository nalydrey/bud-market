import { useState } from "react"
import { BrandForm, IBrandForm } from "../components/forms/BrandForm.component"
import { ModalProvider } from "../components/modal-provider.component"
import { useCreateBrandMutation, useCreateCategoryMutation, useCreateLabelMutation } from "../api/createApi"
import { ILabelForm, LabelForm } from "../components/forms/LabelForm.component"
import { CategoryForm, CategoryFormModel } from "../components/forms/CategoryForm.component"


export const AdminHomePage = () => {


    const [openState, setOpenState] = useState<string[]>([])

    const [createBrand] = useCreateBrandMutation()
    const [createLabel] = useCreateLabelMutation()
    const [createCategory] = useCreateCategoryMutation()

    const handleOpenModal = (name: string) => {
        const set = new Set([...openState, name])
        setOpenState(Array.from(set))
    }

    const handleCloseModal = (name: string) => {
        const set = new Set(openState)
        set.delete(name)
        setOpenState(Array.from(set))
    }

    const handleSubmitBrandForm = (form: IBrandForm) => {
        const formData = new FormData()
        formData.append('name', form.name)
        form.logoImg && formData.append('file', form.logoImg)
        createBrand(formData)
    }

    const handleSubmitLabelForm = (form: ILabelForm) => {
        createLabel(form)
    }

    const handleSubmitCategoryForm = (form: CategoryFormModel) => {
        createCategory(form)
    }


    
    return (
        <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('brand')}
            >Створити бренд</button>
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('label')}
            >Створити мітку</button>
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('category')}
            >Створити категорію</button>
            <ModalProvider
                openedList = {openState}
                onClose={handleCloseModal}
            >
                <BrandForm
                    name="brand"
                    onSubmit={handleSubmitBrandForm}
                />
                <LabelForm
                    name="label"
                    onSubmit={handleSubmitLabelForm}
                />
                <CategoryForm 
                    name="category"
                    onSubmit={handleSubmitCategoryForm}
                />
            </ModalProvider>
        </div>
    )
}