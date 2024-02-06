import { useFormik } from "formik"
import { ModalWindow } from "../modal-window.component"
import { useEffect, useState } from "react"
import { CategorySelector } from "../CategorySelector.component"
import { CategoryModel } from "../../models/entities/category.model"

export interface CategoryFormModel {
    name: string
    parentId: null | number
}

const initialValues: CategoryFormModel = {
    name: '',
    parentId: null
}

interface CategoryFormProps {
    initData?: CategoryFormModel | null
    name?: string
    onSubmit: (form: CategoryFormModel) => void
}

export const CategoryForm = ({
    initData,
    onSubmit
}: CategoryFormProps) => {

    const [open, setOpen] = useState<boolean>(false)

    const {values, handleChange, handleSubmit, setValues} = useFormik({
        initialValues,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })

    useEffect(() => {
        initData &&
        setValues(initData)
    }, [initData, setValues])

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleChangeCategory = (category: CategoryModel | null) => {
        setValues({...values, parentId: category?.id || null})
    }

    return (
        <>
            <form 
                className="flex flex-col gap-3"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    name="name"
                    placeholder="введіть назву категорії"
                    value = {values.name}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={handleOpenModal}
                >Додати в наявну</button>
                <button
                    type="button"
                    onClick={() => handleChangeCategory(null)}
                >Створити самостійну</button>
                <button>Відправити</button>
            </form>
            <ModalWindow
                open = {open}
                onClickEmptySpace={handleCloseModal}
            >
                <CategorySelector
                    onClick={handleChangeCategory}
                />
            </ModalWindow>
        </>
    )
}