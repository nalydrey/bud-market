import { useFormik } from "formik"
import { MUITextField } from "../inputs/MUITextField.component"
import { UniButton } from "../buttons/UniButton.component"
import { RegisterFormModel } from "../../models/forms/register-form.model"
import { registerFormInitData } from "../../data/initial-data/forms/register-form.init"


interface RegisteFormProps {
    name?: string
    onSubmit?: (form: RegisterFormModel) => void
}


export const RegisterForm = ({
    name,
    onSubmit
}: RegisteFormProps) => {

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: registerFormInitData,
        onSubmit: (form) => {
            onSubmit && onSubmit(form)
        }
    })

    return (
        <form 
            className="px-3 flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <MUITextField
                label="Прізвище"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}

            />
            <MUITextField
                label="Ім'я"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
            />
            <MUITextField
                label="Телефон"
                name="phone"
                value={values.phone}
                onChange={handleChange}
            />
            <MUITextField
                label="Електронна пошта"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <MUITextField
                label="Пароль"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <UniButton
                title="Зареєструватись"
            />
        </form>
    )
}