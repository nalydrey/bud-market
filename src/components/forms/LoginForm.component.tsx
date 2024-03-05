import { useFormik } from "formik"
import { MUITextField } from "../inputs/MUITextField.component"
import { UniButton } from "../buttons/UniButton.component"
import { LoginFormModel } from "../../models/forms/login-form.model"
import { loginFormInitData } from "../../data/initial-data/forms/login-form.init"


interface LoginFormProps {
    name?: string
    onSubmit?: (form: LoginFormModel) => void
}

export const LoginForm = ({
    name,
    onSubmit
}: LoginFormProps) => {

    const {values, handleChange, handleSubmit } = useFormik({
        initialValues: loginFormInitData,
        onSubmit: (form) => {
            onSubmit && onSubmit(form)
        }
    })

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <MUITextField
                name="email"
                label="e-mail"
                value={values.email}
                onChange={handleChange}
            />
            <MUITextField
                name="password"
                label="password"
                value={values.password}
                onChange={handleChange}
            />
            <UniButton
                type="submit"
                title="Увійти"
            />
        </form>
    )
}