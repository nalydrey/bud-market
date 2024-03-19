import { useFormik } from "formik"
import { MUITextField } from "../inputs/MUITextField.component"
import { OrderFormModel } from "../../models/forms/order-form.model"
import { orderFormInitData } from "../../data/initial-data/forms/order-form.init"
import { useEffect } from "react"


interface OrderFormProps {
    data: OrderFormModel | null
    id?: string
    onSubmit: (form: OrderFormModel) => void
}

export const OrderForm = ({
    data,
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
        if(data){
            setValues(data)
        }
    }, [data]) 

   
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