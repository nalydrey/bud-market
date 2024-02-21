import { useEffect, useState } from "react"
import { BrandForm, IBrandForm } from "../components/forms/BrandForm.component"
import { ModalProvider } from "../components/modal-provider.component"
import { useCreateBrandMutation, useCreateCategoryMutation, useCreateLabelMutation, useCreateProductMutation } from "../api/createApi"
import { ILabelForm, LabelForm } from "../components/forms/LabelForm.component"
import { CategoryForm, CategoryFormModel } from "../components/forms/CategoryForm.component"
import { ProductForm, ProductFormData } from "../components/forms/ProductForm.component"
import { usePhotoLoad } from "../api/usePhotoLoad"
import { Alert, Snackbar } from "@mui/material"


export const AdminHomePage = () => {


    const [openState, setOpenState] = useState<string[]>([])

    const {loadPhoto} = usePhotoLoad()

    const [createBrand, {isSuccess: isSuccessBrand, isError: isErrorBrand, isLoading: isLoadingBrand, error}] = useCreateBrandMutation()
    const [createLabel, {isSuccess: isLableSuccess, isError: isErrorLable, isLoading: isLoadingLable}] = useCreateLabelMutation()
    const [createCategory] = useCreateCategoryMutation()
    const [createProduct] = useCreateProductMutation()

    console.log(error);

    interface SnackState {
        open: boolean
        message: string
        type: 'error' | 'info' | 'success'
    }

    const [snackState, setSnackState] = useState<SnackState>({open: false, message: '', type: 'success'})

    useEffect(()=>{
        const snackArr: SnackState[] = [
            {
                open: isSuccessBrand,
                message: 'Новий бренд створено',
                type: 'success'
            },
            {
                open: isErrorBrand,
                message: 'Бренд не створено',
                type: 'error'
            },
            {
                open: isLableSuccess, 
                message: 'Нову мітку створено', 
                type: 'success'
            },
            {
                open: isErrorLable, 
                message: 'Мітку не створено', 
                type: 'error'
            },

        ]

        const currentState = snackArr.find(item => item.open)
        currentState && setSnackState(currentState)
        setOpenState([])

    }, [isSuccessBrand, isErrorBrand, isLableSuccess, isErrorLable])
    
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
        const { name, parentId, file} = form
        const formData = new FormData()
        formData.append('name', name)
        parentId && formData.append('parentId', parentId.toString())
        file && formData.append('file', file)
        createCategory(formData)
    }

    const handleSubmitProductForm = async (form: ProductFormData) => {
        console.log(form);
        const {categoryId, labelId, brandId, price} = form
        console.log(categoryId, labelId,  brandId,  price);
        if(form.images){
            const data = await loadPhoto(form.images)
            console.log(data);
            const photoIds = data.photos.map(photo => photo.id)
            if(categoryId && labelId && brandId && price){
                createProduct({...form, categoryId, labelId, brandId, price, images: photoIds})
            }
            
        } 
    }


    const handleCloseSnack = () => {
        setSnackState({...snackState, open: false})
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
            <button className="border px-4 py-2 rounded-lg"
                onClick={() => handleOpenModal('product')}
            >Створити продукт</button>
            <ModalProvider
                isLoading = {isLoadingBrand || isLoadingLable}
                openedList = {openState}
                onClose={handleCloseModal}
            >
                <BrandForm
                    name="brand"
                    onSubmit={handleSubmitBrandForm}
                    onClose={handleCloseModal}
                />
                <LabelForm
                    name="label"
                    onSubmit={handleSubmitLabelForm}
                />
                <CategoryForm 
                    name="category"
                    onSubmit={handleSubmitCategoryForm}
                />
                <ProductForm
                    name="product"
                    onSubmit={handleSubmitProductForm}
                />
            </ModalProvider>
            {/* <button onClick={() => {setSnackMessage('Hello')}}>ggg</button> */}
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackState?.open}
                onClose={handleCloseSnack}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity={snackState.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackState.message}
                </Alert>
            </Snackbar>         
        </div>
    )
}