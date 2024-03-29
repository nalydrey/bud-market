import { useMemo, useState } from "react";
import { CategoryItem } from "../../../components/category-item.component";
import { ModalWindow } from "../../../components/modal-window.component";
import { CategoryModel } from "../../../models/entities/category.model";
import { useModal } from "../../../hooks/useModal";
import { useDeleteCategoryMutation, useGetTreeCategoriesQuery, useUpdateCategoryMutation } from "../../../api/categoryApi";
import { CategoryFormModel } from "../../../models/forms/category-form.model";
import { useInfo } from "../../../hooks/useInfo";
import { CategoryForm } from "../../../components/forms/CategoryForm.component";

export const CategoriesPage = () => {

    const {data: categories, isSuccess} = useGetTreeCategoriesQuery(undefined)
    const [deleteCategory, {isSuccess: isSeccessDelete, error: deleteError}] = useDeleteCategoryMutation()
    const [editCategory] =  useUpdateCategoryMutation()

    useInfo([
        {isSuccess: isSeccessDelete, successMessage: 'Категорія видалена', error: deleteError }
    ])

    const { status, close, open } = useModal()
    const [chosenCategory, setCategory] = useState<CategoryModel | null>(null)

    const editData = useMemo<CategoryFormModel | null>(() => {
        return chosenCategory 
        ?  {name: chosenCategory.name, parentId: null}
        :  null
    }, [chosenCategory])

    const handleDelete = (category: CategoryModel) => {
        deleteCategory(category.id)
    }    
   
    const handleEdit = (category: CategoryModel) => {
        open()
        setCategory(category)
    }    


    const handleSubmit = (form: CategoryFormModel) => {
        chosenCategory &&
        editCategory({id: chosenCategory.id, name: form.name, parentId: form.parentId})
    }

    return(
        <div className="flex gap-2">
            {
                isSuccess &&
                categories.map(category => (
                    <CategoryItem 
                        category={category}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))
            }
            <ModalWindow
                open = {status}
                onClickEmptySpace={close}
            >
                <CategoryForm
                    initData={editData}
                    onSubmit={handleSubmit}
                />
            </ModalWindow>
        </div>
    )
}