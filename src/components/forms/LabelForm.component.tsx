import { useFormik } from "formik"


export interface ILabelForm {
    name: string
    color: string
}

const initialValues: ILabelForm = {
    name: '',
    color: ''
}

interface LabelFormProps {
    name?: string
    onSubmit: (form: ILabelForm) => void
}

export const LabelForm = ({
    name,
    onSubmit
}: LabelFormProps) => {


    const {values, handleSubmit, handleChange} = useFormik({
        initialValues,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })

    return (
        <form 
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                name="name"
                placeholder="введіть назву мітки"
                value={values.name}
                onChange={handleChange}
            />
            <input 
                type="color" 
                name="color"
                placeholder="введіть колір мітки #FFFFFF"
                value={values.color}
                onChange={handleChange}
            />
            <button
                type="submit"
            >Submit</button>
        </form>
    )
}