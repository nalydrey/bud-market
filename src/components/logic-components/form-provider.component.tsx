import { useCreateBrandMutation } from "../../api/brandApi"
import { useCreateCategoryMutation } from "../../api/categoryApi"
import { useCreateLabelMutation } from "../../api/labelApi"
import { useCreateProductMutation } from "../../api/productApi"
import { useRegisterUserMutation } from "../../api/userApi"
import { useModalProvider } from "../../hooks/useModalProvider"
import { useUser } from "../../hooks/useUser"
import { BrandFormModel } from "../../models/forms/brand-form.model"
import { CategoryFormModel } from "../../models/forms/category-form.model"
import { LabelFormModel } from "../../models/forms/label-form.model"
import { LoginFormModel } from "../../models/forms/login-form.model"
import { ProductFormModel } from "../../models/forms/product-form.model"
import { RegisterFormModel } from "../../models/forms/register-form.model"
import { BrandForm } from "../forms/BrandForm.component"
import { CategoryForm } from "../forms/CategoryForm.component"
import { LabelForm } from "../forms/LabelForm.component"
import { LoginForm } from "../forms/LoginForm.component"
import { ProductForm } from "../forms/ProductForm.component"
import { RegisterForm } from "../forms/RegisterForm.component"
import { ModalProvider } from "../modal-provider.component"
import { useInfo } from "../../hooks/useInfo"


export const FormProvider = () => {

    const {openedList, close} = useModalProvider()

    const {enterToApp} = useUser()

    const [createBrand, {isSuccess: isSuccessBrand, isLoading: isLoadingBrand, error: brandError}] = useCreateBrandMutation()
    const [createLabel, {isSuccess: isuccessLabel, isLoading: isLoadingLable, error: labelError}] = useCreateLabelMutation()
    const [createCategory, {isSuccess: issuccessCategory, isLoading: isLoadingCategory, error: caregoryError}] = useCreateCategoryMutation()
    const [createProduct, {isSuccess: isSuccessProduct, isLoading: isLoadingProduct, error: productError}] = useCreateProductMutation()
    const [registerUser, {isSuccess: isSuccessRegister, isLoading: isLoadingRegister, error: registerError}] = useRegisterUserMutation()

    useInfo([
        {isSuccess: isSuccessBrand, successMessage: 'Новий бренд створено', error: brandError},
        {isSuccess: isuccessLabel, successMessage: 'Лейба створена', error: labelError},
        {isSuccess: issuccessCategory, successMessage: 'Категорія створена', error: caregoryError},
        {isSuccess: issuccessCategory, successMessage: 'Категорія створена', error: caregoryError},
        {isSuccess: isSuccessProduct, successMessage: 'Продукт створено', error: productError},
        {isSuccess: isSuccessRegister, successMessage: 'Користувача зареєстровано', error: registerError},
    ])



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
        const formData = new FormData()
        Object.entries(form).forEach(([key, value]) => {
            if(value){

                if(value instanceof FileList){
                    const fileArr = Array.from(value)
                    fileArr.forEach(file => formData.append('file', file))
                    return
                }

                if(typeof value === 'string') {
                    formData.append(key, value)
                    return
                }

                if(typeof value === 'number'){
                    formData.append(key, value.toString())
                    return
                }
            
                if(Array.isArray(value) && value.length ) {
                    formData.append(key, JSON.stringify(value))
                    return
                }
            }
        })
        createProduct(formData)
    }

    const handleOnSubmitRegisterForm = (form: RegisterFormModel) => {
        registerUser(form)
    }

    const handleSubmitLoginForm = (form: LoginFormModel) => {
        enterToApp(form)
    }


    

    return (
        <>
            <ModalProvider
                isLoading = {isLoadingBrand || isLoadingLable || isLoadingCategory || isLoadingProduct || isLoadingRegister}
                openedList = {openedList}
                onClose={close}
            >
                <RegisterForm
                    name = 'register'
                    onSubmit={handleOnSubmitRegisterForm}
                />
                <LoginForm
                    name = 'login'
                    onSubmit={handleSubmitLoginForm}
                />
                <BrandForm
                    name="brand"
                    onSubmit={handleSubmitBrandForm}
                    onClose={close}
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
        </>
    )
}