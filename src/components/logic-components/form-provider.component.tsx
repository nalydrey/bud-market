import { useCreateBrandMutation } from "../../api/brandApi"
import { useCreateCategoryMutation } from "../../api/categoryApi"
import { useCreateLabelMutation } from "../../api/labelApi"
import { useCreateProductMutation } from "../../api/productApi"
import { BrandFormModel } from "../../models/forms/brand-form.model"
import { CategoryFormModel } from "../../models/forms/category-form.model"
import { LabelFormModel } from "../../models/forms/label-form.model"
import { ProductFormModel } from "../../models/forms/product-form.model"
import { BrandForm } from "../forms/BrandForm.component"
import { CategoryForm } from "../forms/CategoryForm.component"
import { LabelForm } from "../forms/LabelForm.component"
import { ProductForm } from "../forms/ProductForm.component"
import { ModalProvider } from "../modal-provider.component"


export const FormProvider = () => {

    const [createBrand, {isSuccess: isSuccessBrand, isError: isErrorBrand, isLoading: isLoadingBrand, error}] = useCreateBrandMutation()
    const [createLabel, {isSuccess: isLableSuccess, isError: isErrorLable, isLoading: isLoadingLable}] = useCreateLabelMutation()
    const [createCategory] = useCreateCategoryMutation()
    const [createProduct] = useCreateProductMutation()

    const handleSubmitBrandForm = (form: BrandFormModel) => {
        const formData = new FormData()
        formData.append('name', form.name)
        form.logoImg && formData.append('file', form.logoImg)
        createBrand(formData)
    }

    const handleSubmitLabelForm = (form: LabelFormModel) => {
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

    const handleSubmitProductForm = async (form: ProductFormModel) => {
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

    return (
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
    )
}