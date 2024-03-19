import { useFormik } from "formik"
import { LabelFormModel } from "../../models/forms/label-form.model"
import { labelFormInitData } from "../../data/initial-data/forms/label-form.init"
import { MUITextField } from "../inputs/MUITextField.component"
import { Button } from "@mui/material"


interface LabelFormProps {
    name?: string
    onSubmit: (form: LabelFormModel) => void
}

export const LabelForm = ({
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
            <MUITextField
                name="name"
                label="Назва мітки"
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
            <Button 
                variant="contained"
                type="submit"
            >
                Відправити
            </Button>
        </form>
    )
}