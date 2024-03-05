import { useFormik } from "formik"
import { BasketItemModel } from "../../models/entities/basketItem.model"
import { MUITextField } from "../inputs/MUITextField.component"
import { useEffect } from "react"
import { OrderFormModel } from "../../models/forms/order-form.model"
import { orderFormInitData } from "../../data/initial-data/forms/order-form.init"


interface OrderFormProps {
    goods: BasketItemModel[]
    id?: string
    onSubmit: (form: OrderFormModel) => void
}

export const OrderForm = ({
    goods,
    id,
    onSubmit
}: OrderFormProps) => {


    const { values, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: orderFormInitData,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })

    useEffect(() => {
        setValues({...values, goods})
    }, [goods])

    return (
        <form 
            className="grid grid-cols-2 gap-10"
            id={id} 
            onSubmit={handleSubmit}
        >
            <MUITextField
                name="lastName"
                label="Прізвище"
                value={values.lastName}
                onChange={handleChange}
            />
            <MUITextField
                name="firstName"
                label="Ім'я"
                value={values.firstName}
                onChange={handleChange}
            />
            <MUITextField
                name="phone"
                label="телефон"
                value={values.phone}
                onChange={handleChange}
            />
            <MUITextField
                name="email"
                label="email"
                value={values.email}
                onChange={handleChange}
            />
        </form>
    )
}