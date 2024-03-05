import { useFormik } from "formik"
import { MainInput } from "../inputs/MainInput.component"
import { FormButton } from "../buttons/FormButton.componet"
import { LabelFormModel } from "../../models/forms/label-form.model"
import { labelFormInitData } from "../../data/initial-data/forms/label-form.init"


interface LabelFormProps {
    name?: string
    onSubmit: (form: LabelFormModel) => void
}

export const LabelForm = ({
    name,
    onSubmit
}: LabelFormProps) => {


    const {values, handleSubmit, handleChange} = useFormik({
        initialValues: labelFormInitData,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })


    return (
        <form 
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <MainInput
                name="name"
                title="Назва мітки"
                value={values.name}
                onChange={handleChange}
            />
            <label htmlFor="color" className="border rounded-md p-2 flex justify-center items-center cursor-pointer" style={{background: values.color}}>
                <input 
                    className="w-0 h-0 opacity-0"
                    id='color'
                    type="color" 
                    name="color"
                    placeholder="введіть колір мітки #FFFFFF"
                    value={values.color}
                    onChange={handleChange}
                />
                <span className="font-bold">Оберіть колір</span>
            </label>
            <FormButton
                title="Зберегти"
            />
        </form>
    )
}